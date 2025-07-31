import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const AboutUs = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()


  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/tabs?fields=title,heading,body,images.directus_files_id.data.full_url`)
      .then((response) => {


        if (response?.data?.data?.length > 0) {
          console.log(response.data);
          setdata(response.data.data[0])
          // response?.data?.data[0].map((data1,i)=>{
          //     setdata(data1) 
          //     console.log(data1);
          // })
          //   setdata(response) 
        }

      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  return (
    <Layout header_data={data_header}>
      <div
        className="mx-3 "
      >
        <img
          className="w-full "
          src="/images/upper.png"
        />
        <div className="leading-[ 22.5px] font-normal">
          <h5 className="text-center">
            {data?.heading || "About School"}
            {/* About us */}

          </h5>
          <p className="mb-0">
          Rose Mary Hr. Sec. School Jahangirabad School is a Higher Secondary School for both girls and boys managed by Rose Mary Group. Rose Mary Group was established in 1991 and run by Mr Devendra Singh Ji. Our institution is recogniged by the Madhya Pradesh Board of education. Rose Mary School, Jahagirabad is committed to fostering excellence in education. We firmly believe that teaching is not about knowledge downloads, but opening the minds of young learners. We guide them towards learning, comprehensively focussing on the overall development of each student.
PHILOSOPHY BE WHAT YOU WANT TO BE Some people follow a path they choose on their own. They discover their true calling. They chase their dreams with passion, and excel in their chosen discipline. But, best of all, they become what they want to be. Presidium is the school for such people. It is our belief that a teacher's influence is for eternity. Our teachers, therefore, identify the interests and aspirations of students and, working closely with their parents, nourish their individual talents. Our faculty, by focusing on life skills and methodology, brings out the best in our students. We believe that every child is exceptional and has the potential to evolve into a dynamic person and fulfill his/her aspirations. At Rose Mary School, Jahangirabad every learner becomes who he or she is destined to be: A leader of tomorrow.
          </p>
        </div>
        <img
          className="w-full"
          src="/images/lower.png"
        />
      </div>
    </Layout>
  );

}

export default AboutUs;


export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
