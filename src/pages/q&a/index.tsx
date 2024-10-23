import Layout from '@/layouts/Layout';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@/components/modal';
import {
  useGetHotQuestionQuery,
  useGetQuestionByIdQuery,
  useGetQuestionQuery,
  useSearchQuestionQuery,
  useStoreQuestionMutation,
} from '@/services/api/questionService';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FaqState, QuestionState } from '@/features/Question/Question.type';
import { Bounce, toast } from 'react-toastify';
import { useGetFaqQuery } from '@/services/api/faqService';
import { IoClose, IoSendSharp } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import Paginate from '@/components/paginate';
import Breadcrumb from '@/components/breadcrumb';
import { Switch } from '@/components/ui/switch';
import DetailQuestion from '@/features/Question/components/DetailQuestion';

const FaqList = dynamic(
  () => import('@/features/Question/components/FaqAccordion'),
  {
    ssr: false,
  },
);

const QuestionList = dynamic(
  () => import('@/features/Question/components/QuestionList'),
  {
    ssr: false,
  },
);

export default function Question() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [questionId, setQuestionId] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [clearSearch, setClearSearch] = useState(false);
  const [dataQuestion, setDataQuestion] = useState<QuestionState[]>([]);
  const [lastPage, setLastPage] = useState(1);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isSuccess, refetch } = useGetQuestionQuery(page);

  const { data: dataHotQuestion, isLoading: isLoadingHotQuestion } =
    useGetHotQuestionQuery(null);

  const { data: dataFaq, isLoading: isLoadingFaq } = useGetFaqQuery(1);
  const faqs: FaqState[] = dataFaq?.data?.data || [];

  const { data: dataSearch, isLoading: isLoadingSearch } =
    useSearchQuestionQuery(search);

  const { data: dataQuestionView, isLoading: isLoadingView } =
    useGetQuestionByIdQuery(questionId || 0);

  const [store, { isLoading: isLoadingStore }] = useStoreQuestionMutation();

  useEffect(() => {
    if (isSuccess && !search) {
      setDataQuestion(data?.data?.data || []);
      setLastPage(data?.data?.last_page || 1);
    }
  }, [data, isSuccess, search]);

  useEffect(() => {
    if (dataSearch && search.length > 3) {
      setDataQuestion(dataSearch?.data?.data || []);
      setLastPage(dataSearch?.data?.last_page || 1);
    }
  }, [dataSearch, search]);

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toLowerCase();
      setSearch(value);
      setClearSearch(value.length > 0);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        if (value.length > 3) {
          setDataQuestion(dataSearch?.data?.data || []);
          setLastPage(dataSearch?.data?.last_page || 1);
        } else if (value.length === 0) {
          setDataQuestion(data?.data?.data || []);
          setLastPage(data?.data?.last_page || 1);
        }
      }, 300);
    },
    [dataSearch, data],
  );

  const handleClearSearch = () => {
    setSearch('');
    setClearSearch(false);
    setDataQuestion(data?.data?.data || []);
    setLastPage(data?.data?.last_page || 1);
  };

  const formSchema = z.object({
    email: z.string().email().nonempty(),
    content: z.string().nonempty(),
    is_show: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      content: '',
      is_show: false,
    },
  });

  const handleChangePage = useCallback((page: number) => {
    setPage(page);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, []);

  const handleToggleModal = () => setIsOpen(!isOpen);

  const handleOpenModalAnswer = (id: number) => {
    setQuestionId(id);
    setIsAnswerOpen(true);
  };

  const handleCloseModalAnswer = () => {
    setQuestionId(0);
    setIsAnswerOpen(false);

    refetch();
  };

  const handleHotQuestion = (content: string) => {
    setSearch(content);
    setClearSearch(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (content.length > 3) {
        setDataQuestion(dataSearch?.data?.data || []);
        setLastPage(dataSearch?.data?.last_page || 1);
      } else if (content.length === 0) {
        setDataQuestion(data?.data?.data || []);
        setLastPage(data?.data?.last_page || 1);
      }
    }, 300);

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  const onSubmit = async (data: {
    email: string;
    content: string;
    is_show: boolean;
  }) => {
    try {
      const response = await store(data);

      toast(response?.data?.message, {
        type: response?.data?.success ? 'success' : 'error',
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      refetch();
      form.reset();
      handleToggleModal();
    } catch (error) {
      throw new Error(
        'An error occurred while submitting your question. Please try again.',
      );
    }
  };

  return (
    <Layout
      id="qa"
      pageTitle="Question | Japan Dahwa Foundantion"
      pageDescription="Question page"
    >
      <Modal
        title="Ask your question"
        isOpen={isOpen}
        onClose={handleToggleModal}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 mt-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Question</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Ask your question"
                      className="h-32"
                    />
                  </FormControl>
                  {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_show"
              render={({ field }) => (
                <FormItem>
                  <div className="flex h-full items-center gap-2">
                    <label
                      htmlFor="is_show"
                      className="text-primary cursor-pointer"
                    >
                      Show on public
                    </label>
                    <Switch
                      id="is_show"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-6 flex items-center">
              {isLoadingStore ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <IoSendSharp className="md:text-md text-xs -rotate-45 -mt-1 mr-2" />
                  Send
                </>
              )}
            </Button>
          </form>
        </Form>
      </Modal>
      <DetailQuestion
        data={dataQuestionView?.data || {}}
        isOpen={isAnswerOpen}
        isLoading={isLoadingView}
        onCloseModalAnswer={handleCloseModalAnswer}
      />
      <header
        id="hero"
        className="lg:min-h-[50vh] md:min-h-[40vh] min-h-[50vh] flex justify-center items-center"
      >
        <div className="relative z-10 w-full md:max-w-[600px] max-w-xs lg:pt-8 md:pt-14 pt-20">
          <h2
            data-aos="fade-up"
            className="md:text-4xl text-2xl font-bold text-center text-white"
          >
            Have a question?
          </h2>
          <p
            data-aos="fade-up"
            className="text-center text-white md:mt-6 mt-2 md:text-lg text-md"
          >
            We are here to help you.
          </p>
          {/* <div className="flex gap-2 w-full mt-8">
            <div className="relative bg-white focus-within:border-primary rounded md:h-11 h-10 w-full">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-primary" />
              <input
                type="text"
                className="w-full h-full bg-transparent pl-10 text-primary outline-primary"
                placeholder="Search for your question"
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={handleSubmitSearch}
              className="bg-primary text-white px-8 py-2 rounded hover:bg-[#191919] duration-300"
            >
              Search
            </button>
          </div> */}
        </div>
      </header>
      <nav className="lg:h-24 md:h-20 h-16 bg-[#191919] flex items-center lg:px-32 px-8">
        <Breadcrumb />
      </nav>
      <div ref={sectionRef} className="lg:px-32 px-8 py-10 lg:py-14">
        <h2 className="lg:text-2xl text-base font-bold lg:mb-8 mb-6 lg:mt-0 -mt-4">
          Frequently Asked Questions
        </h2>
        <FaqList data={faqs} isLoading={isLoadingFaq} />
      </div>
      <section className="lg:px-32 px-8 lg:py-14 py-10 w-full bg-[#191919]">
        <div className="flex md:flex-row flex-col md:gap-8 gap-10">
          <div className="lg:w-3/4 md:w-3/5 w-full">
            <div className="h-12 flex items-center justify-between mb-6">
              <h2 className="lg:text-2xl text-base font-bold">
                Question & Answer
              </h2>
              <Button
                className="gap-1 text-primary md:py-2 !bg-white md:px-4 px-3 rounded hover:!bg-primary duration-300 relative md:text-sm text-xs hover:!text-white flex items-center"
                onClick={handleToggleModal}
              >
                <IoSendSharp className="md:text-lg text-xs -rotate-45 -mt-1" />
                Ask a Question
              </Button>
            </div>
            <div className="relative flex lg:hidden h-12 w-full mb-6">
              <input
                type="text"
                className="w-full h-full bg-primary/50 pl-10 text-primary outline-primary rounded text-white"
                placeholder="Search for your question"
                onChange={handleSearch}
                value={search}
              />
              {clearSearch && (
                <button
                  type="button"
                  className="rounded-full p-1 hover:bg-primary/60 absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                  onClick={handleClearSearch}
                >
                  <IoClose />
                </button>
              )}
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
            </div>

            <QuestionList
              data={dataQuestion}
              isLoading={isLoading}
              isLoadingSearch={isLoadingSearch}
              isLoadingButton={isLoadingView}
              onHandleAnswer={handleOpenModalAnswer}
            />

            <Paginate
              page={page}
              lastPage={lastPage}
              onChange={handleChangePage}
            />
          </div>
          <div className="lg:w-1/4 md:w-2/5 w-full">
            <div className="relative md:flex hidden h-12 w-full mb-6">
              <input
                type="text"
                className="w-full h-full bg-primary/50 px-10 text-primary outline-primary rounded text-white"
                placeholder="Search for your question"
                onChange={handleSearch}
                value={search}
              />
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
              {clearSearch && (
                <button
                  type="button"
                  className="rounded-full p-1 hover:bg-primary/60 absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
                  onClick={handleClearSearch}
                >
                  <IoClose />
                </button>
              )}
            </div>
            <div data-aos="fade-left" className="flex flex-col">
              <div className="py-4 md:px-6 px-4 bg-primary/60">
                <h2 className="font-medium">Hot Question</h2>
              </div>
              {isLoadingHotQuestion && (
                <div className="flex flex-col gap-4">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="h-24 bg-[#777A7B] rounded-tr-xl"
                    />
                  ))}
                </div>
              )}
              {dataHotQuestion?.data?.map((item: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  className="md:py-4 py-3 md:px-6 px-4 border-b border-gray-500 text-start hover:bg-primary/50 duration-300"
                  onClick={() => handleHotQuestion(item?.content)}
                >
                  <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                    {item?.content}
                  </h2>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
