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
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Modal from '@/components/modal';
import { FaPlus } from 'react-icons/fa6';
import {
  useGetQuestionQuery,
  useSearchQuestionQuery,
  useStoreQuestionMutation,
} from '@/services/api/questionService';
import { timeAgo } from '@/lib/helpers';
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
import { QuestionState } from '@/features/Question/Question.type';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { Bounce, toast } from 'react-toastify';
import { BsChatRightTextFill } from 'react-icons/bs';

export default function Question() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dataQuestion, setDataQuestion] = useState<QuestionState[]>([]);
  const [lastPage, setLastPage] = useState(1);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, isSuccess, refetch } = useGetQuestionQuery(page);

  const { data: dataSearch, isLoading: isLoadingSearch } =
    useSearchQuestionQuery(search);

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

  const handleSubmitSearch = () => {
    if (search.length > 3) {
      setDataQuestion(dataSearch?.data?.data || []);
      setLastPage(dataSearch?.data?.last_page || 1);
    } else if (search.length === 0) {
      setDataQuestion(data?.data?.data || []);
      setLastPage(data?.data?.last_page || 1);
    }
  };

  const formSchema = z.object({
    title: z.string().nonempty(),
    email: z.string().email().nonempty(),
    content: z.string().nonempty(),
    is_show: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      email: '',
      content: '',
      is_show: false,
    },
  });

  const handleChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleToggleModal = () => setIsOpen(!isOpen);

  const [store] = useStoreQuestionMutation();

  const onSubmit = async (data: {
    title: string;
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
      form.reset();
      handleToggleModal();
    } catch (error) {
      throw new Error(
        'An error occurred while submitting your question. Please try again.',
      );
    }
  };

  return (
    <Layout id="qa" pageTitle="Question" pageDescription="Question page">
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title" />
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
            <FormItem>
              <div className="flex h-full items-center gap-2">
                <label className="text-primary">Show on public</label>
                <input
                  type="checkbox"
                  {...form.register('is_show')}
                  className="text-primary"
                />
              </div>
              {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
              <FormMessage />
            </FormItem>
            <Button type="submit" className="!mt-6">
              Loading
              {/* {isLoading ? 'Loading...' : 'Submit'} */}
            </Button>
          </form>
        </Form>
      </Modal>
      <header
        id="hero"
        className="lg:min-h-[50vh] md:min-h-[40vh] min-h-[50vh] flex justify-center items-center"
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
                onChange={handleSearch}
              />
            </div>
            <button
              onClick={handleSubmitSearch}
              className="bg-primary text-white px-8 py-2 rounded hover:bg-[#191919] duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <nav className="lg:h-24 md:h-20 h-16 bg-primary flex justify-between items-center lg:px-32 px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-md">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-white hover:text-[#777A7B]"
                href="/"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="!text-white">
                Question & Answer
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <button
          onClick={handleToggleModal}
          className="bg-white text-primary lg:px-8 lg:py-3 px-2 py-2 rounded hover:bg-[#191919] hover:text-white duration-300 font-medium flex items-center"
        >
          <FaPlus className="text-xs" />
          <span className="md:ml-2 ml-1 lg:text-md md:text-sm text-[10px]">
            Ask a Question
          </span>
        </button>
      </nav>
      <section className="lg:px-32 px-8 lg:py-20 py-10 w-full bg-[#191919] flex md:flex-row flex-col md:gap-8 gap-10">
        <div className="md:w-3/4 w-full">
          {isLoading ||
            (isLoadingSearch && (
              <div className="flex flex-col gap-4">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-24 bg-[#777A7B]" />
                ))}
              </div>
            ))}
          {dataQuestion?.length === 0 && (
            <h2 className="text-lg">No question and answer found...</h2>
          )}
          {dataQuestion?.length > 0 && (
            <div className="flex flex-col gap-3">
              {/* {dataQuestion?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-start pb-6 h-fit border-b"
                >
                  <div className="h-full">
                    <Icon className="h-12 w-12" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="border-l pl-4">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <h2 className="text-xl font-semibold">
                            {item.title}
                          </h2>
                          <div className="flex gap-4">
                            <h4 className="flex gap-1 items-center text-xs">
                              <MdOutlineWatchLater className="text-[#777A7B] text-lg" />
                              <span className="text-[#777A7B]">
                                {timeAgo(item?.created_at)}
                              </span>
                            </h4>
                            <h4 className="flex gap-1 items-center text-xs">
                              <FaRegEye className="text-[#777A7B] text-lg" />
                              <span className="text-[#777A7B]">10</span>
                            </h4>
                          </div>
                        </div>
                        <button className="bg-primary text-white px-8 py-2 rounded hover:bg-[#191919] duration-300">
                          Answer
                        </button>
                      </div>
                      <p className="text-[#777A7B] mt-4">{item.content}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <p className="text-[#777A7B]">Answered by: Admin</p>
                    </div>
                  </div>
                </div>
              ))} */}
              {dataQuestion?.map((item: any) => (
                <div
                  key={item.id}
                  className="flex md:gap-4 gap-2 items-start h-fit bg-primary/50 border-b p-6 rounded-tr-xl"
                >
                  <div className="h-full">
                    <Icon className="md:h-11 md:w-11 h-9 w-9" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="pl-2">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <h2 className="lg:text-xl md:text-lg text-md font-semibold">
                            {item.title}
                          </h2>
                          <div className="flex gap-3">
                            <h4 className="flex gap-1 items-center">
                              <MdOutlineWatchLater className="text-[#777A7B] text-md" />
                              <span className="text-[#777A7B] md:text-xs text-[10px]">
                                {timeAgo(item?.created_at)}
                              </span>
                            </h4>
                            <h4 className="flex gap-1 items-center text-xs">
                              <FaRegEye className="text-[#777A7B] text-md" />
                              <span className="text-[#777A7B] md:text-xs text-[10px]">
                                10
                              </span>
                            </h4>
                          </div>
                        </div>
                        <Button
                          size="icon"
                          className="bg-primary text-white p-2 rounded hover:bg-[#191919] duration-300 relative flex-shrink-0 md:ml-4 ml-1"
                        >
                          <div className="rounded-full bg-[#f05454] h-2 w-2 absolute -top-[14px] -right-[14px] p-3 flex justify-center items-center text-[10px]">
                            {item?.answers?.length}
                          </div>
                          <BsChatRightTextFill className="md:text-md text-xs" />
                        </Button>
                      </div>
                      <p className="text-white md:mt-4 mt-2">{item.content}</p>
                    </div>
                    {/* <div className="flex justify-end mt-4">
                      <div className="flex gap-2">
                        <MdOutlineChatBubbleOutline className="text-[#777A7B] text-md" />
                        <span className="text-[#777A7B]">10</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination className="mt-10">
            <PaginationPrevious
              className={cn(
                'cursor-pointer',
                page === 1 && 'cursor-not-allowed',
              )}
              onClick={() => page > 1 && handleChangePage(page - 1)}
            >
              Previous
            </PaginationPrevious>
            <PaginationContent>
              {[...Array(lastPage || 1)].map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => handleChangePage(index + 1)}
                  className={cn(
                    'cursor-pointer',
                    index + 1 === page && 'bg-white text-primary rounded',
                  )}
                >
                  <PaginationLink>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              className={
                page === lastPage ? '!cursor-not-allowed' : 'cursor-pointer'
              }
              onClick={() =>
                page < (lastPage || 1) && handleChangePage(page + 1)
              }
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
        <div className="md:w-1/4 w-full">
          <div className="flex flex-col">
            <div className="py-4 md:px-6 px-4 bg-primary">
              <h2 className="font-medium">Hot Question</h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Twitter Bootsrap 3.0 - tabs-left not working anymore?
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Changing the color on my tabbed left bootstrap3 tabs
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                How to create tabs on the left in bootstrap.js v3.0.0?
              </h2>
            </div>
            <div className="md:py-4 py-3 md:px-6 px-4 border-b">
              <h2 className="leading-normal lg:text-md md:text-sm text-xs">
                Bootstrap horizontal form with left floated side tabs
              </h2>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
