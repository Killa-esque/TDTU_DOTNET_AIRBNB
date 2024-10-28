import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import qs from "query-string";
import useSearchModal from "@/hooks/useSearchModal";

import CountrySelect, { CountrySelectValue } from "@/components/User/Common/CountrySelect";
import Modal from "./Modal";
import Heading from "../Common/Heading";
import Calendar from "../Common/Calendar";
import Counter from "../Common/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const [params] = useSearchParams();
  const searchModel = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs(), dayjs()]);
  const [disabledDates, setDisabledDates] = useState<Dayjs[]>([]);

  const navigate = useNavigate();

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    console.log(updatedQuery)

    if (dateRange[0]) {
      updatedQuery.startDate = dateRange[0].toString();
    }

    if (dateRange[1]) {
      updatedQuery.endDate = dateRange[1].toString();
    }

    console.log(updatedQuery)

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModel.onClose();

    navigate(url); // Thay thế navigate bằng history.push
  }, [step, searchModel, location, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
      <CountrySelect value={location} onChange={(value) => {
        console.log(value)
        setLocation(value as CountrySelectValue)
      }} />
      <hr />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
        <Calendar
          value={dateRange}
          onChange={(dates) => setDateRange([dates[0] || dayjs(), dates[1] || dayjs()])}
          disabledDates={disabledDates} // Truyền disabledDates vào Calendar
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter onChange={(value) => setGuestCount(value)} value={guestCount} title="Guests" subtitle="How many guests are coming?" />
        <hr />
        <Counter onChange={(value) => setRoomCount(value)} value={roomCount} title="Rooms" subtitle="How many rooms do you need?" />
        <hr />
        <Counter onChange={(value) => setBathroomCount(value)} value={bathroomCount} title="Bathrooms" subtitle="How many bathrooms do you need?" />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondActionLabel}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
    />
  );
}

export default SearchModal;
