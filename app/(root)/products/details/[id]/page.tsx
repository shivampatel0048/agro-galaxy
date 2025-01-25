
import ProductDetails from "@/components/product/ProductDetails";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    return (
        <ProductDetails id={id} />
    );
};

export default Page;
