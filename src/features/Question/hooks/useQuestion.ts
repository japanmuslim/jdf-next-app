import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { FaqState, QuestionState } from '../Question.type';
import {
  useGetHotQuestionQuery,
  useGetQuestionByIdQuery,
  useGetQuestionQuery,
  useSearchQuestionQuery,
  useStoreQuestionMutation,
} from '@/services/api/questionService';
import { useGetFaqQuery } from '@/services/api/faqService';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bounce, toast } from 'react-toastify';

const useQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [questionId, setQuestionId] = useState<number>(0);
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
    useSearchQuestionQuery(search, {
      skip: search.length <= 3,
    });

  const { data: dataQuestionView, isLoading: isLoadingView } =
    useGetQuestionByIdQuery(questionId, {
      skip: questionId === 0,
    });

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

  return {
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
    questionId,
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
    onSubmit,
  };
};

export default useQuestion;
