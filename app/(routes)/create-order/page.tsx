import Navbar from "./components/navbar";
import Order from "./components/order";

export default function OrderPage({
  searchParams,
}: {
  searchParams: { Url: string; label: string; CreatorId: string };
}) {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Order
        image={searchParams.Url}
        name={searchParams.label}
        CreaterId={searchParams.CreatorId}
      />
    </main>
  );
}
