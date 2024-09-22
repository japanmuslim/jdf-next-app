import Icon from '@/components/icon';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Layout from '@/layouts/Layout';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { useState } from 'react';
import Modal from '@/components/modal';

export default function Question() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleModal = () => setIsOpen(!isOpen);

  return (
    <Layout id="qa" pageTitle="Question" pageDescription="Question page">
      <Modal isOpen={isOpen} onClose={handleToggleModal} />
      <header
        id="hero"
        className="min-h-[50vh] flex justify-center items-center"
      >
        <div className="relative z-10 w-full md:max-w-[600px] max-w-xs lg:pt-8 md:pt-14 pt-20">
          <h2 className="md:text-4xl text-2xl font-bold text-center text-white">
            Have a question?
          </h2>
          <p className="text-center text-white mt-3 md:text-lg text-md">
            We are here to help you.
          </p>
          <div className="flex gap-2 w-full mt-8">
            <div className="relative bg-white focus-within:border-primary rounded md:h-11 h-10 w-full">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-primary" />
              <input
                type="text"
                className="w-full h-full bg-transparent pl-10 text-primary outline-primary"
                placeholder="Search for your question"
              />
            </div>
            <button className="bg-primary text-white px-8 py-2 rounded hover:bg-[#191919] duration-300">
              Search
            </button>
          </div>
        </div>
      </header>
      <nav className="h-24 bg-primary flex justify-between items-center lg:px-32">
        <Breadcrumb>
          <BreadcrumbList className="text-md">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-white hover:text-[#777A7B]"
                href="/q&a"
              >
                Question & Answer
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="!text-white">
                All Question
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <h2 className="whitespace-nowrap">All Question</h2> */}
        <button
          onClick={handleToggleModal}
          className="bg-white text-primary px-8 py-3 rounded hover:bg-[#191919] hover:text-white duration-300 font-medium"
        >
          Ask a Question
        </button>
      </nav>
      <section className="lg:px-32 py-20 w-full bg-[#191919] flex gap-8">
        <div className="w-3/4">
          <div className="flex gap-4 items-start border-b pb-6 h-fit">
            <div className="h-full">
              <Icon className="h-16 w-16" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="border-l pl-4">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">What is Moslem</h2>
                    <div className="flex gap-4">
                      <h4 className="flex gap-2 items-center text-xs">
                        <MdOutlineWatchLater className="text-[#777A7B] text-lg" />
                        <span className="text-[#777A7B]">2 hours ago</span>
                      </h4>
                      <h4 className="flex gap-2 items-center text-xs">
                        <FaRegEye className="text-[#777A7B] text-lg" />
                        <span className="text-[#777A7B]">10</span>
                      </h4>
                    </div>
                  </div>
                  <button className="bg-primary text-white px-8 py-2 rounded hover:bg-[#191919] duration-300">
                    Answer
                  </button>
                </div>
                <p className="text-[#777A7B] mt-4">
                  On the other hand, we denounce with righteous indignation and
                  dislike men who are so beguiled and demoralized by the charms
                  of pleasure of the moment.
                </p>
              </div>
              <div className="flex justify-end mt-4">
                <p className="text-[#777A7B]">Answered by: Admin</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex flex-col">
            <div className="py-4 px-6 bg-primary">
              <h2 className="font-medium">Hot Question</h2>
            </div>
            <div className="py-6 px-6 border-b">
              <h2 className="leading-normal">
                Twitter Bootsrap 3.0 - tabs-left not working anymore?
              </h2>
            </div>
            <div className="py-6 px-6 border-b">
              <h2 className="leading-normal">
                Changing the color on my tabbed left bootstrap3 tabs
              </h2>
            </div>
            <div className="py-6 px-6 border-b">
              <h2 className="leading-normal">
                How to create tabs on the left in bootstrap.js v3.0.0?
              </h2>
            </div>
            <div className="py-6 px-6 border-b">
              <h2 className="leading-normal">
                Bootstrap horizontal form with left floated side tabs
              </h2>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
