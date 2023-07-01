import WhoToFollow from "@/components/ui/components/whoToFollow";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <div className="block md:grid md:grid-cols-10 ">
      <div className="block md:col-span-6">{children}</div>
      <div className="hidden px-4 py-10 border-r md:block md:col-span-4">
        {/* @ts-ignore server component cant ne rendered as jsx for now */}
        <WhoToFollow />
      </div>
    </div>
  );
}
