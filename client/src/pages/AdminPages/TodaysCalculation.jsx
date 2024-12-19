import React from 'react'
import AdminLayout from '../../components/AdminComponents/Layout/AdminLayout';
import Breadcrumb from '../../components/AdminComponents/Breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const TodaysCalculationPage = () => {
  return (
    <AdminLayout>
      <Breadcrumb pageName="আজকের হিসাব" />
      <div className='w-full mx-auto'>
        <Tabs defaultValue="store" className="w-full ">
          <TabsList className="">
            <TabsTrigger
              className="sm:text-lg text-gray-900 sm:mr-10 shadow-lg shadow-gray-300"
              value="store"
            >
              জমা আছে
            </TabsTrigger>
            <TabsTrigger
              className="sm:text-lg text-gray-900 sm:mx-10 shadow-lg shadow-gray-300"
              value="entri"
            >
              প্রবেশ করল
            </TabsTrigger>
            <TabsTrigger
              className="sm:text-lg text-gray-900 sm:ml-10 shadow-lg shadow-gray-300"
              value="exist"
            >
              বাহির হলো
            </TabsTrigger>
          </TabsList>
          <TabsContent value="store">
            Make changes to your account here. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nisi dignissimos atque perferendis
            neque esse a praesentium explicabo corporis porro nesciunt, ipsam
            natus rerum voluptates, eum quidem. Voluptatum reprehenderit veniam
            tenetur libero temporibus, perferendis labore possimus incidunt
            assumenda voluptatibus harum sequi sapiente soluta est unde dolorum
            facere doloremque! Quos debitis dolor excepturi nostrum tenetur
            perferendis rem voluptates laudantium corporis facere doloribus
            corrupti molestiae repudiandae aspernatur nam possimus facilis
            placeat quas dolorum, officiis obcaecati. Quae rem vitae sunt, ad
            porro minus blanditiis aperiam eum consequuntur debitis esse aliquam
            quia saepe facilis sit, officiis nobis magni doloribus laudantium
            quis architecto ipsa placeat! Earum!
          </TabsContent>
          <TabsContent value="entri">Change your password here.</TabsContent>
          <TabsContent value="exist">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

export default TodaysCalculationPage
