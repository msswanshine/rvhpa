import type { Password, User, Member } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User, Member } from "@prisma/client";

export type UserWithMember = User & {
  member: Member | null;
};

export async function getUserById(id: User["id"]): Promise<UserWithMember | null> {
  return prisma.user.findUnique({ 
    where: { id },
    include: { member: true }
  });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ 
    where: { email },
    include: { member: true }
  });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
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
  });
}

export async function updateMember(
  userId: User["id"],
  data: { firstName?: string; lastName?: string; email?: string }
) {
  return prisma.member.update({
    where: { userId },
    data
  });
}

export async function getMemberByUserId(userId: User["id"]) {
  return prisma.member.findUnique({
    where: { userId }
  });
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
    },
  });

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
