import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface UserWithMember {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  member: Member | null;
}

export async function getUserById(id: User["id"]): Promise<UserWithMember | null> {
  const result = await prisma.user.findUnique({ 
    where: { id },
    include: { member: true }
  });
  return result as unknown as UserWithMember | null;
}

export async function getUserByEmail(email: User["email"]): Promise<UserWithMember | null> {
  const result = await prisma.user.findUnique({ 
    where: { email },
    include: { member: true }
  });
  return result as unknown as UserWithMember | null;
}

export async function createUser(email: User["email"], password: string): Promise<UserWithMember> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
    include: { member: true }
  });
  return result as unknown as UserWithMember;
}

export async function createMember(
  userId: User["id"],
  data: { firstName: string; lastName: string; email: string }
) {
  return prisma.member.create({
    data: {
      ...data,
      user: {
        connect: { id: userId }
      }
    }
  }) as unknown as Member;
}

export async function updateMember(
  userId: User["id"],
  data: { firstName?: string; lastName?: string; email?: string }
) {
  return prisma.member.update({
    where: { userId },
    data
  }) as unknown as Member;
}

export async function getMemberByUserId(userId: User["id"]) {
  return prisma.member.findUnique({
    where: { userId }
  }) as unknown as Member | null;
}

export async function updateUser(id: User["id"], data: { firstName?: string; lastName?: string }) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
      member: true,
    }
  }) as unknown as (UserWithMember & { password: Password }) | null;

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
