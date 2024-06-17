import Container from '@/components/ui/container';
import Billboard from '@/components/ui/Billboard/billboard2';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';
import Image from 'next/image';

import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getSizes from '@/actions/get-sizes';
import getBillboard from "@/actions/get-billboard";

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ 
  params, 
  searchParams
}) => {
  const products = await getProducts({ 
    categoryId: params.categoryId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const category = await getCategory(params.categoryId);

  return (
    <div className="content-shift bg-white">
      <Container>
      <Billboard data={category.billboard}>
        <Image src="/background.svg" alt="Background" layout="fill" />
      </Billboard>
        <div className="px-4 sm:px-6 lg:px-8 pb-24 mt-10">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
