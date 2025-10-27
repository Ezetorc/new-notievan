export function Hero(props: { title: string; description: string }) {
  return (
    <section className="flex overflow-hidden mobile:flex-col tablet:flex-row desktop:items-center my-10 gap-x-7">
      <h1 className="text-brand-blue font-title mobile:text-8xl desktop:text-9xl mt-[15px]">
        {props.title}
      </h1>

      <hr className="bg-brand-blue mobile:hidden tablet:block w-[5px] h-[100px]" />

      <h2 className="w-[20ch] text-brand-blue mobile:text-2xl desktop:text-3xl">
        {props.description}
      </h2>
    </section>
  );
}
