import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map((logo) => (
          <div
            key={`logo-${logo.alt}`}
            className="flex items-center justify-center w-36 md:w-48 h-10 md:h-12 shrink-0"
          >
            <img
              alt={logo.alt}
              width={144}
              height={48}
              className="pointer-events-none max-h-8 md:max-h-10 w-auto select-none dark:brightness-0 dark:invert object-contain scale-[4.2] md:scale-[4.8]"
              style={{ aspectRatio: "144 / 48" }}
              loading="lazy"
              src={logo.src}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
