import CardToDo from "@/components/CardToDo";
import NewTaskButton from "@/components/NewTaskButton";
import { Suspense } from "react";
import LoadingContent from "@/components/LoadingContent";

export default function Home() {
  return (
    <main>
      <div className="m-5">
        <NewTaskButton />
        <div className="flex flex-wrap gap-4 justify-center">
          <Suspense fallback={<LoadingContent />}>
            <CardToDo />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
