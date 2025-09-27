import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import ProfileView from "./profile.client";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const userId = Number((session.user as any).id);
  if (!Number.isInteger(userId)) redirect("/login");

  const [me, stats] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        phone: true, // 👈 เพิ่ม
        memberId: true,
        cardIssuedAt: true,
        cardExpiredAt: true,
      },
    }),
    (async () => {
      const enroll = await prisma.enrollment.count({ where: { userId } });
      const completed = await prisma.progress.count({
        where: { userId, isDone: true },
      });
      const totalLessons = await prisma.progress.count({ where: { userId } });
      const progressPct = totalLessons
        ? Math.round((completed / totalLessons) * 100)
        : 0;
      return { enroll, completed, progressPct };
    })(),
  ]);

  if (!me) redirect("/login");

  return <ProfileView me={me} stats={stats} />;
}
