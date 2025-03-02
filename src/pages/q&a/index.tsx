import Layout from '@/layouts/Layout';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import Modal from '@/components/modal';
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
import { IoClose, IoSendSharp } from 'react-icons/io5';
import dynamic from 'next/dynamic';
import Paginate from '@/components/paginate';
import Breadcrumb from '@/components/breadcrumb';
import { Switch } from '@/components/ui/switch';
import useQuestion from '@/features/Question/hooks/useQuestion';
import ReCAPTCHA from 'react-google-recaptcha';
import { KEY_RECAPTCHA } from '@/contants';

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

const DetailQuestion = dynamic(
  () => import('@/features/Question/components/DetailQuestion'),
  {
    ssr: false,
  },
);

export default function Question() {
  const {
    isDisabled,
    dataQuestion,
    lastPage,
    isLoading,
    isLoadingHotQuestion,
    isLoadingFaq,
    isLoadingSearch,
    isLoadingView,
    isLoadingStore,
    form,
    sectionRef,
    isOpen,
    isAnswerOpen,
    page,
    search,
    clearSearch,
    faqs,
    dataHotQuestion,
    dataQuestionView,
    handleSearch,
    handleClearSearch,
    handleChangePage,
    handleToggleModal,
    handleOpenModalAnswer,
    handleCloseModalAnswer,
    handleHotQuestion,
    setIsDisabled,
    onSubmit,
  } = useQuestion();

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
                  <FormLabel className="text-primary">Eメール</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Eメール" />
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
                  <FormLabel className="text-primary">質問</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="質問を記入してください"
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
                      公開する
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
            <div className="w-full flex justify-center">
              <ReCAPTCHA
                sitekey={KEY_RECAPTCHA}
                onChange={() => setIsDisabled(false)}
              />
            </div>
            <Button
              type="submit"
              className="!mt-6 flex items-center"
              disabled={isDisabled}
            >
              {isLoadingStore ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  <IoSendSharp className="md:text-md text-xs -rotate-45 -mt-1 mr-2" />
                  送信する
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
            ご質問はありますか？
          </h2>
          <p
            data-aos="fade-up"
            className="text-center text-white md:mt-6 mt-2 md:text-lg text-md"
          >
            お困りの際はいつでもご連絡ください
          </p>
          {/* <div className="flex gap-2 w-full mt-8">
            <div className="relative bg-white focus-within:border-primary rounded md:h-11 h-10 w-full">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-primary" />
              <input
                type="text"
                className="w-full h-full bg-transparent pl-10 text-primary outline-primary"
                placeholder="質問の検索"
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
          よくある質問
        </h2>
        <FaqList data={faqs} isLoading={isLoadingFaq} />
      </div>
      <section className="lg:px-32 px-8 lg:py-14 py-10 w-full bg-[#191919]">
        <div className="flex md:flex-row flex-col md:gap-8 gap-10">
          <div className="lg:w-3/4 md:w-3/5 w-full">
            <div className="h-12 flex items-center justify-between mb-6">
              <h2 className="lg:text-2xl text-base font-bold">質問と回答</h2>
              <Button
                className="gap-1 text-primary md:py-2 !bg-white md:px-4 px-3 rounded hover:!bg-primary duration-300 relative md:text-sm text-xs hover:!text-white flex items-center"
                onClick={handleToggleModal}
              >
                <IoSendSharp className="md:text-lg text-xs -rotate-45 -mt-1" />
                質問する
              </Button>
            </div>
            <div className="relative flex lg:hidden h-12 w-full mb-6">
              <input
                type="text"
                className="w-full h-full bg-primary/50 pl-10 text-primary outline-primary rounded text-white"
                placeholder="質問の検索"
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
                placeholder="質問の検索"
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
                <h2 className="font-medium">注目の質問</h2>
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
