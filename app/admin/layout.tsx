import { auth } from "@/auth";
import Adminsidebar from "@/components/admin/Adminsidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import '@/styles/admin.css';

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if(!session?.user?.id) redirect('/sign-in'); 
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Adminsidebar session={session}/>

      <div className="admin-container">
        <p>Header</p>
        {children}
      </div>
    </main>
  );
};

export default layout;
