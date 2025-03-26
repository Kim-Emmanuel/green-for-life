import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db/client';
import { generateToken } from '@/lib/auth/jwt';
import { userSchema } from '@/lib/db/schema';
import { z } from 'zod';
import { Role } from '@prisma/client';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = userSchema.pick({
  username: true,
  email: true,
}).extend({
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    const { type, ...data } = await request.json();

    if (type === 'login') {
      const { email, password } = loginSchema.parse(data);
      
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const safeUser = userSchema.omit({ password_hash: true }).parse(user);
      const token = generateToken(safeUser);
      return NextResponse.json({ token });
    }

    if (type === 'register') {
      const { username, email, password } = registerSchema.parse(data);
      
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password_hash: hashedPassword,
          role: Role.USER,
        },
      });

      const safeUser = userSchema.omit({ password_hash: true }).parse(newUser);
      const token = generateToken(safeUser);
      return NextResponse.json({ token });
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}