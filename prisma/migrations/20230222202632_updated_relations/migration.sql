/*
  Warnings:

  - You are about to drop the column `userId` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the `TasksInGoals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropForeignKey
ALTER TABLE "TasksInGoals" DROP CONSTRAINT "TasksInGoals_goalId_fkey";

-- DropForeignKey
ALTER TABLE "TasksInGoals" DROP CONSTRAINT "TasksInGoals_taskId_fkey";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "userId";

-- DropTable
DROP TABLE "TasksInGoals";

-- CreateTable
CREATE TABLE "_activeGoals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_completedGoals" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GoalToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_activeTasks" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_completedTasks" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_activeGoals_AB_unique" ON "_activeGoals"("A", "B");

-- CreateIndex
CREATE INDEX "_activeGoals_B_index" ON "_activeGoals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_completedGoals_AB_unique" ON "_completedGoals"("A", "B");

-- CreateIndex
CREATE INDEX "_completedGoals_B_index" ON "_completedGoals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GoalToTask_AB_unique" ON "_GoalToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_GoalToTask_B_index" ON "_GoalToTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_activeTasks_AB_unique" ON "_activeTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_activeTasks_B_index" ON "_activeTasks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_completedTasks_AB_unique" ON "_completedTasks"("A", "B");

-- CreateIndex
CREATE INDEX "_completedTasks_B_index" ON "_completedTasks"("B");

-- AddForeignKey
ALTER TABLE "_activeGoals" ADD CONSTRAINT "_activeGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activeGoals" ADD CONSTRAINT "_activeGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedGoals" ADD CONSTRAINT "_completedGoals_A_fkey" FOREIGN KEY ("A") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedGoals" ADD CONSTRAINT "_completedGoals_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalToTask" ADD CONSTRAINT "_GoalToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalToTask" ADD CONSTRAINT "_GoalToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activeTasks" ADD CONSTRAINT "_activeTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activeTasks" ADD CONSTRAINT "_activeTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedTasks" ADD CONSTRAINT "_completedTasks_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_completedTasks" ADD CONSTRAINT "_completedTasks_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
