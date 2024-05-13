import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import BlogMiniSlider from "./common/blogMiniSlider";
import MenuNews from "./common/menuNews";
import MenuNewsSlider from "./common/menuNewsSlider";
import TopNews from "./common/topNews";
import axios from "axios";
import LatestBlogsSlider from "./common/LatestBlogsSlider";

const BlogsPage: NextPage = () => {
  const getRoute = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`;
  const [data, setData] = useState([]);
  const [trendingNewsData, setTrendingNewsData] = useState([]);
  const [technologyData, setTechnologyData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await axios.get(getRoute);
        const responseData = response.data;
        // because first record have missing variable names
        const slicedResponse = responseData.slice(1);
        setData(slicedResponse);
        console.log("slicedResponse", slicedResponse);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    setTrendingNewsData(
      data.filter(
        (item) => item.blog_category?.blog_category_id === "Trending News"
      )
    );

    setTechnologyData(
      data.filter(
        (item) => item.blog_category?.blog_category_id === "Technology"
      )
    );

    setEntertainmentData(
      data.filter(
        (item) => item.blog_category?.blog_category_id === "Entertainment"
      )
    );

    setBusinessData(
      data.filter((item) => item.blog_category?.blog_category_id === "Business")
    );

    console.log("trendingNewsData: ", trendingNewsData);
    console.log("technologyData:", technologyData);
    console.log("entertainmentData:", entertainmentData);
    console.log("businessData:", businessData);
  }, [data]);

  // sample data 1

  const contentData = [
    // Define your content data here, each object representing a piece of content
    {
      id: 0,
      title:
        "Cras sed semper puru vitae lobortis velit ajsdlkfj alksdjfl ajsldkflak sjldkfjalsk jdfajslkdfj lkasjdf",
      image: "/blog-page-assets/img/cat-news-1.jpg",
      description:
        "Description for the first item aksldfjlka sjdflkajsdl flkasdkf jkasdjfk ljasldfj klsjdkf jlsd aslkdjf alksdjf lksdjf lksdjf klsjdf ksjdlf sjdfk sjdlkfj",
      date: "05-Jan-2020",
      baseCategory: "Alex",
      category: "country",
    },
    {
      id: 1,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "city",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/cat-news-2.jpg",
    },
    {
      id: 2,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "state",
      date: "05-Mar-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/cat-news-3.jpg",
    },
    {
      id: 3,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "province",
      date: "05-Apr-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/cat-news-1.jpg",
    },
    {
      id: 4,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "bike",
      date: "05-May-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/cat-news-2.jpg",
    },
    {
      id: 5,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "Other",
      date: "05-Jun-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/cat-news-3.jpg",
    },
    {
      id: 6,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "More",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/cat-news-1.jpg",
    },
    {
      id: 7,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "AndMore",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/cat-news-2.jpg",
    },
    {
      id: 8,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "country",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/cat-news-1.jpg",
    },
    {
      id: 9,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category: "city aksdjfk lsjksdjf ksdj fklsdjf ksjdflskdjf  sdfsdf",
      date: "05-Feb-2020",
      title:
        "Vestibulum ante ipsum primis aslkdjf lkasjdflk ajsdlfj askdfjlk sjdfksdf",
      description:
        "Description for the second item aslkdjf lkasjdflk ajsdlfj askdfjlk sjdfksdf",
      image: "/blog-page-assets/img/cat-news-2.jpg",
    },
    {
      id: 10,
      baseCategory: "al ksjdfka jsldfkj askdlf jasdklfj laksdjf ",
      category:
        "many more alskdjf klasjdflk asjdlfka jsdlkfjaslkd fjlksadjflks djfk",
      date: "05-Feb-2020",
      title:
        "Sed quis convallis lacus aklsjdflk jsdklf jaslkdfj alksjdf ksjdfl ksjdfkl sjd lfksjdflk sjdf",
      description:
        "Description for the third item kkasjdlk fjaslkdjf laksjdf klasjdlfk jasldkfj alskdjf klasjdf",
      image: "/blog-page-assets/img/cat-news-3.jpg",
    },

    // Add content for other categories
  ];

  // sample date 2
  const subcategories1 = [
    "All",
    "primek asdjlfkj aslkdfj lksdjfk jskdjf klsjldfj ksjdklf sdf",
    "computer",
    "school",
    "hill",
    "station",
    "new people",
    "many people klasdfk jaslkdfj lkasjdfl kajsdlf jaskldfjlaks jdflasjdf",
    "many more alskdjf klasjdflk asjdlfka jsdlkfjaslkd fjlksadjflks djfk",
  ];

  const contentData1 = [
    // Define your content data here, each object representing a piece of content
    {
      id: 0,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title:
        "Cras sed semper puru vitae lobortis velit laksdjf klasjdlkf jaslkdj flasjldkf jalskdj fjalskdjlfk ajsldjf",
      description:
        "Description for the first item lobortis velit laksdjf klasjdlkf jaslkdj flasjldkf jalskdj fjalskdjlfk ajsldjf",
      image: "/blog-page-assets/img/demo/1.jpg",
    },
    {
      id: 1,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/2.jpg",
    },
    {
      id: 2,
      baseCategory: "Smith",
      category: "computer",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/3.jpg",
    },
    {
      id: 3,
      category: "school",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/4.jpg",
    },
    {
      id: 4,
      baseCategory: "Smith",
      category: "hill",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/5.jpg",
    },
    {
      id: 5,
      baseCategory: "Smith",
      category: "station",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/6.jpg",
    },
    {
      id: 6,
      baseCategory: "Smith",
      category: "new people",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/7.jpg",
    },
    {
      id: 7,
      baseCategory: "Smith",
      category: "many people",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/8.jpg",
    },
    {
      id: 8,
      baseCategory: "Smith",
      category: "many more",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/9.jpg",
    },
    {
      id: 0,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/1.jpg",
    },
    {
      id: 1,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/2.jpg",
    },
    {
      id: 2,
      baseCategory: "Smith",
      category: "computer",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/3.jpg",
    },
    {
      id: 3,
      baseCategory: "Smith",
      category: "school",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/4.jpg",
    },
    {
      id: 4,
      baseCategory: "Smith",
      category: "hill",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/5.jpg",
    },
    {
      id: 5,
      baseCategory: "Smith",
      category: "station",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/6.jpg",
    },
    {
      id: 6,
      baseCategory: "Smith",
      category: "new people",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/7.jpg",
    },
    {
      id: 7,
      baseCategory: "Smith",
      category: "many people",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/8.jpg",
    },
    {
      id: 8,
      baseCategory: "Smith",
      category: "many more",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/9.jpg",
    },
    {
      id: 0,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/1.jpg",
    },
    {
      id: 1,
      baseCategory: "Smith",
      category: "prime",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/2.jpg",
    },
    {
      id: 2,
      baseCategory: "Smith",
      category: "computer",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/3.jpg",
    },
    {
      id: 3,
      baseCategory: "Smith",
      category: "school",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/4.jpg",
    },
    {
      id: 4,
      baseCategory: "Smith",
      category: "hill",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/5.jpg",
    },
    {
      id: 5,
      baseCategory: "Smith",
      category: "station",
      date: "05-Feb-2020",
      title: "Sed quis convallis lacus",
      description: "Description for the third item",
      image: "/blog-page-assets/img/demo/6.jpg",
    },
    {
      id: 6,
      baseCategory: "Smith",
      category: "new people",
      date: "05-Feb-2020",
      title: "Cras sed semper puru vitae lobortis velit",
      description: "Description for the first item",
      image: "/blog-page-assets/img/demo/7.jpg",
    },
    {
      id: 7,
      baseCategory: "Smith",
      category: "many people",
      date: "05-Feb-2020",
      title: "Vestibulum ante ipsum primis",
      description: "Description for the second item",
      image: "/blog-page-assets/img/demo/8.jpg",
    },
    {
      id: 8,
      baseCategory: "Smith",
      category:
        "many more alskdjf klasjdflk asjdlfka jsdlkfjaslkd fjlksadjflks djfk",
      date: "05-Feb-2020",
      title:
        "Cras sed semper puru vitae lobortis velit aklsdjflk ajsdlkf jasldkfjk askjldf lkasdlfj kasjdf",
      description:
        "Description for the first item lajsdfk ajsdlfk jasjdflk jasldfj alksdjf lkasjdfl kasjdf",
      image: "/blog-page-assets/img/demo/9.jpg",
    },
  ];

  return (
    <div className="bg-light">
      <h3 className="text-center">Latest News</h3>

      {/* <!-- section start --> */}
      <section className="section-big-py-space blog-page ratio2_3">
        <div className="custom-container">
          {/* <!-- Top News Start--> */}
          <div className="top-news">
            <div className="container-fluid">
              <TopNews contentData={trendingNewsData} />
            </div>
          </div>
          {/* <!-- Top News End--> */}

          {/* <!-- Main News Start--> */}
          <div className="main-news">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-md-12">
                      <MenuNews contentData={technologyData} />
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="sidebar">
                    <div className="sidebar-widget">
                      <div className="col-md-12">
                        <MenuNewsSlider contentData={data} slidesToShow={1} />
                      </div>
                    </div>
                    <div className="sidebar-widget"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main News End--> */}

          {/* <!-- Category News Start--> */}
          <div className="cat-news">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <BlogMiniSlider
                    contentData={entertainmentData}
                    slidesToShow={2}
                  />
                </div>

                <div className="col-md-6">
                  <BlogMiniSlider contentData={businessData} slidesToShow={2} />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Category News End--> */}

          {/* <!-- Category News Start--> */}
          <div className="cat-news">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <LatestBlogsSlider
                    contentData={data.reverse()}
                    slidesToShow={4}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Category News End--> */}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
