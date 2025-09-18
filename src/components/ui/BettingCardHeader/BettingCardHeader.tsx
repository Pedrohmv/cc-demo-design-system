import { cn } from '../../../utils/cn';

const imgImage = "http://localhost:3845/assets/c2cc2c8a20203a045abceb3b5c4835cd54a2198e.png";
const imgImage1 = "http://localhost:3845/assets/6be2ed5e8e15a724536126a18a00e7ffd1ffc306.png";

export interface BettingCardHeaderProps {
  // Match information
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  league?: string;
  matchTime?: string;

  // Styling
  className?: string;

  // Actions
  onClick?: () => void;
}

export default function BettingCardHeader({
  homeTeam = "Man. City",
  awayTeam = "Barcelona",
  homeTeamLogo = imgImage,
  awayTeamLogo = imgImage1,
  league = "Champions League",
  matchTime = "Hoje, 14:00",
  className,
  onClick
}: BettingCardHeaderProps) {
  return (
    <div
      className={cn(
        "content-stretch flex items-center justify-between relative size-full cursor-pointer",
        className
      )}
      data-name="Header"
      data-node-id="16997:28267"
      onClick={onClick}
    >
      <div className="content-stretch flex gap-[8px] items-center justify-start relative shrink-0 w-[163px]" data-name="Partida" data-node-id="16997:28268">
        <div className="content-stretch flex items-start justify-start relative shrink-0" data-name="escudos" data-node-id="16997:28269">
          <div
            className="bg-center bg-cover bg-no-repeat shrink-0 size-[24px]"
            data-name="image"
            data-node-id="16997:28270"
            style={{ backgroundImage: `url('${homeTeamLogo}')` }}
          />
          <div
            className="bg-center bg-cover bg-no-repeat h-[24px] shrink-0 w-[25.091px]"
            data-name="image"
            data-node-id="16997:28271"
            style={{ backgroundImage: `url('${awayTeamLogo}')` }}
          />
        </div>
        <div className="basis-0 flex flex-col font-['DM_Sans:Bold',_sans-serif] font-['DM_Sans:Regular',_sans-serif] grow justify-center leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#646464] text-[0px] text-[12px]" data-node-id="16997:28272">
          <p className="mb-0">
            <span>{`${homeTeam} `}</span>
            <span>vs</span>
          </p>
          <p>{awayTeam}</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[2px] items-end justify-start leading-[0] not-italic relative shrink-0 text-[#646464] text-[10px] text-nowrap text-right w-[104px]" data-name="Info" data-node-id="16997:28273">
        <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] justify-center relative shrink-0" data-node-id="16997:28274">
          <p className="leading-none text-nowrap whitespace-pre">{league}</p>
        </div>
        <div className="flex flex-col font-['DM_Sans:Bold',_sans-serif] justify-center relative shrink-0" data-node-id="16997:28275">
          <p className="leading-none text-nowrap whitespace-pre">{matchTime}</p>
        </div>
      </div>
    </div>
  );
}