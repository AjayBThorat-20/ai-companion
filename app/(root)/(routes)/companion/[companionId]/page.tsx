import { redirect } from "next/navigation";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

import { CompanionForm } from "./components/companion-form";


interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
};

const CompanionIdPage = async ({
  params 
}: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect("/");
  }

  // const companion = await prismadb.companion.findUnique({
  //   where: {
  //     // id: params.companionId !== null ? params.companionId : undefined,
  //     id: String(params.companionId),
  //     userId,
  //   }
  // });

  if (params.companionId === null || params.companionId === undefined) {
  } else {
    const companion = await prismadb.companion.findUnique({
      where: {
        id: "6d795f757365725f69643030",
        userId,
      },
    });  

  console.log("params data :" + params);
  // console.log("companion data" + companion);
  console.log(companion);



  const categories = await prismadb.category.findMany();

  return ( 
    <CompanionForm initialData={companion} categories={categories} />
  );
}
}
 
export default CompanionIdPage;
