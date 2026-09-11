import Image from "next/image";

export type TechnologyIconProps = { className?: string };

export const AzureDataFactoryIcon = ({ className }: TechnologyIconProps) => (
  <Image
    src="/azure-data-factory.svg"
    alt=""
    width={20}
    height={20}
    className={`object-contain ${className ?? ""}`}
    aria-hidden="true"
    data-technology-logo="Azure Data Factory"
  />
);
