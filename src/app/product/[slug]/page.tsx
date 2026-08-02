import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { products, getProduct, type ProductType } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const product = getProduct(slug);
    if (!product) return { title: "Product" };
    return {
      title: product.name,
      description: product.description,
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20 text-neutral-500">
          Loading configurator…
        </div>
      }
    >
      <ProductDetailClient productId={product.id as ProductType} />
    </Suspense>
  );
}
