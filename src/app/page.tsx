import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants, Button } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    name: "Personalized Guides",
    Icon: ArrowDownToLine,
    description: "Get a personalized running guide tailored to your fitness level and goals.",
  },
  {
    name: "Starter Guides",
    Icon: CheckCircle,
    description: "New to running? Start with our beginner guides to build your stamina.",
  },
  {
    name: "Top Rated Guides",
    Icon: CheckCircle,
    description: "New to running? Start with our beginner guides to build your stamina.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MaxWidthWrapper className="flex-grow">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Transform Your Journey from <span className="text-blue-500">Bum to Runner</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to Bum2Run, the ultimate AI-powered tool to create your personalized running
            guide. Whether you&apos;re aiming for a 10k, 30k, or even a marathon, our app will help
            you achieve your goals step by step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/dashboard" className={buttonVariants()}>
              Browse Guides
            </Link>
            <Button variant="ghost">Get Started &rarr;</Button>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Features */}
      <section className="border-t border-gray-200 bg-gray-50 mt-auto mb-4">
        <MaxWidthWrapper className="py-20">
          <div className="mt-4 pb-2 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {guides.map((guide) => (
              <div
                key={guide.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                    {<guide.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{guide.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{guide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
