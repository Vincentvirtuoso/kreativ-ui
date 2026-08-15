import { useEffect, useRef, useState } from "react";

type State = "none" | "error" | "success";
type TransitionState = Exclude<State, "none"> | undefined;

const TRANSITION_DURATION = 1500;

export function useStateTransition(state: State) {
  const previousState = useRef(state);
  const [transitionState, setTransitionState] = useState<TransitionState>();

  useEffect(() => {
    if (state === previousState.current) {
      return;
    }

    previousState.current = state;

    if (state === "none") {
      setTransitionState(undefined);
      return;
    }

    setTransitionState(state);

    const timeout = window.setTimeout(() => {
      setTransitionState(undefined);
    }, TRANSITION_DURATION);

    return () => window.clearTimeout(timeout);
  }, [state]);

  return transitionState;
}
