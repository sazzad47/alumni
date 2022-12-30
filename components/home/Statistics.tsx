import { Grid, Typography } from "@mui/material";
import React, { useState, ReactNode } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const items = [
  { id: 1, title: "Total Members", number: 100 },
  { id: 2, title: "Events", number: 100 },
  { id: 3, title: "Seminars", number: 100 },
  { id: 4, title: "Reviews", number: 100 },
];
type Props = {
  children?: ReactNode;
  onEnter: () => any;
  onExit: () => any;
  className: string;
};
const Counter: React.FC = () => {
  const [counterOn, setCounterOn] = useState<boolean>(false);
  const TriggerCounter = ScrollTrigger as unknown as React.FC<Props>;
  return (
    <React.Fragment>
      <Grid className="w-full p-5 min-h-[20vh] bg-slate-300 dark:bg-emerald-800 text-slate-900 dark:text-slate-200">
        <TriggerCounter
          onEnter={() => setCounterOn(true)}
          onExit={() => setCounterOn(false)}
          className="w-full"
        >
          <Grid
            className="w-full grid grid-cols-4 gap-2 text-slate-900 dark:text-slate-50"
          >
           
            {items.map((item) => (
              <Grid
                key={item.id}               
              >
                <Grid className="counter_item_global min-h-[6rem] mb-3 p-2 flex flex-col items-center justify-center bg-gray-400 dark:bg-green-900 text-slate-900 dark:text-slate-50 border-b-4 border-slate-700 dark:border-green-700 ">
                <p className="mt-2 text-sm whitespace-nowrap">
                  {item.title}
                </p>
                <h3>
                  {counterOn ? (
                    <CountUp
                      start={0}
                      end={item.number}
                      duration={2}
                      delay={0}
                    />
                  ) : (
                    item.number
                  )}
                  +
                </h3>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </TriggerCounter>
      </Grid>
    </React.Fragment>
  );
};

export default Counter;