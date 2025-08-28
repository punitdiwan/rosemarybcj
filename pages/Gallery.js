import React, { useState } from 'react';
import Layout from '../Component/Layout';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { base_url, school_name } from '../SimpleState/auth';

const Gallery = ({ data_header, gallery_data }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Fallback static slides if gallery_data is not available
  const staticSlides = [
    { title: "/images/glr1.jpg ", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: " /images/glr3.jpg", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: "/images/glr3.jpg ", description: 'View Gallery' },
    { title: " /images/glr1.jpg", description: 'View Gallery' },
  ];

  const images = gallery_data?.data?.length > 0
    ? gallery_data.data.map(item => ({
        src: item.photo.data.full_url?.replace('http://', 'https://'),
      }))
    : staticSlides.map(item => ({
        src: item.title.trim(),
      }));

  return (
    <Layout header_data={data_header}>
      <div className="container-fluid">
        <div className="md:grid p-5 md:grid-cols-5 sm:grid pt-20 sm:grid-cols-2 bg-[#0066cc]">
          {images.map((item, i) => (
            <div key={i} className="p-2">
              <img
                src={item.src}
                className="w-full h-[200px] rounded-lg cursor-pointer"
                alt={`gallery-${i}`}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={index}
        styles={{ container: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      />
    </Layout>
  );
};

export default Gallery;

// Server-side fetches
export async function getStaticProps(context) {
  let data_header, gallery_data;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`);
    data_header = await response.json();
  } catch (error) {
    data_header = false;
  }

  try {
    const response1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/gallery?fields=*.*.*`);
    gallery_data = await response1.json();
  } catch (error) {
    gallery_data = false;
  }

  return {
    props: { data_header, gallery_data },
    revalidate: 1,
  };
}
