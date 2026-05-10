import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Choose Your Favorite Meal",
    description: "We offer a diverse menu with more than 50 delicious dishes",
    image: "/fast food-rafiki.png",
  },
  {
    id: 2,
    title: "We Deliver It to You",
    description: "Fast delivery service that keeps your food fresh and hot",
    image: "/Take Away-pana.png",
  },
  {
    id: 3,
    title: "Enjoy Your Meal",
    description: "A hot and fresh meal delivered to you wherever you are",
    image: "/Pizza sharing-bro.png",
  },
];

export default function DeliveryService() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 px-15 max-lg:px-0 ">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground inline-block relative">
            How to use delivery{" "}
            <span className="relative">
              service
              <span className="absolute bottom-2 left-0 w-full h-[3px] bg-primary rounded-full"></span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center space-y-6 group transition-transform hover:-translate-y-2"
            >
              <div className="relative w-40 h-40 flex items-center justify-center">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={160}
                  height={160}
                  className="object-contain"
                  priority={step.id === 1}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <hr className="text-primary my-10 border-primary border-1" />
      </div>
    </section>
  );
}
