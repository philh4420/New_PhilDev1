declare module "@lottiefiles/react-lottie-player" {
  import * as React from "react";

  export interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    autoplay?: boolean;
    loop?: boolean;
    src: string;
    mode?: "normal" | "bounce" | "reverse";
    style?: React.CSSProperties;
    speed?: number;
    controls?: boolean;
  }

  export const Player: React.FC<PlayerProps>;
}
