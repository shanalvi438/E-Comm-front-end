import { NextPage } from "next";
import Layout1 from "views/layouts/layout1";
import React, { useEffect, useState } from "react";
import FaqContainer from "views/layouts/widgets/FaqContainer/FaqContainer";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface FaqState{
 id : number
 faqs : any[]
}

const LeftSidebar: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const faqRedux = useSelector((state: { faq: FaqState }) => state.faq);
  const [selectedFaq, setSelectedFaq] = useState({faqs: []});

  useEffect(() => {
    const selected = faqRedux.faqs.find(faq => faq.id === Number(id));
    setSelectedFaq(selected || {});
  }, [faqRedux,id]);

  return (
    <Layout1>
      <section className="section-big-pt-space section-big-pb-space ratio_asos bg-light">
        <div className="custom-container">
          <FaqContainer selectedFaq={selectedFaq} />
        </div>
      </section>
    </Layout1>
  );
};

export default LeftSidebar;
