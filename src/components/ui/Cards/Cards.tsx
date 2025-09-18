import { cn } from '../../../utils/cn';

const imgImage = "http://localhost:3845/assets/c2cc2c8a20203a045abceb3b5c4835cd54a2198e.png";
const imgImage1 = "http://localhost:3845/assets/6be2ed5e8e15a724536126a18a00e7ffd1ffc306.png";
const imgIcon = "http://localhost:3845/assets/518218316e4c50ee35a65a7d514506337104ccca.svg";
const imgCircle = "http://localhost:3845/assets/6497a4c5cab7b5342c3ba5b553ba888bd48d3ae7.svg";
const imgCircle1 = "http://localhost:3845/assets/7011ade469b2fe6bb1437ef686ae8351fcb5b081.svg";
const img = "http://localhost:3845/assets/d41b2918305506d371cd7cb491ef9d556155ac16.svg";
const img1 = "http://localhost:3845/assets/7d01038672687fce2c2995ab2dd3187c19ba0383.svg";
const img2 = "http://localhost:3845/assets/840c1671e05342e4cdb49ea5fd5ba3055f31c1fd.svg";
const img3 = "http://localhost:3845/assets/b51f61b051e82f9363643c1edcba196c4a4f3e50.svg";
const img4 = "http://localhost:3845/assets/9c5161b3554a8a73e3039f222a6cbfdff23c04af.svg";
const img5 = "http://localhost:3845/assets/2d2ef56c4f3722165e82c4010d863dd9e05746e7.svg";
const img6 = "http://localhost:3845/assets/221e474f6361cb118e60e512918082a1213e4684.svg";
const img7 = "http://localhost:3845/assets/fae7f8aeaeb106059f56b74f74b97d48b329f9b5.svg";
const img8 = "http://localhost:3845/assets/05c5e09083b9a8f0807ff6e77c58dcb4425c3d35.svg";
const img9 = "http://localhost:3845/assets/5cbf42f2c00764ad632a8d9390623b9681c2fe26.svg";
const img10 = "http://localhost:3845/assets/b1940976e684496328bc3e669a536a04f9966d04.svg";
const img11 = "http://localhost:3845/assets/e6aedfdbe8749a7c2a96b169b236de560184f599.svg";
const img12 = "http://localhost:3845/assets/9aad7c6da246b99874bf321778abb067eb3ebed4.svg";
const img13 = "http://localhost:3845/assets/bfb83b38468166100f983af8e7def569d870923e.svg";
const img14 = "http://localhost:3845/assets/aee25172cd4aa822d6da36ff240ddf194cca9035.svg";
const img15 = "http://localhost:3845/assets/7c1a806162ed6f04de2d97d56063332f76decee8.svg";
const img16 = "http://localhost:3845/assets/e955f7b4f2700b71e59970e1e007d19af067c0e4.svg";
const img17 = "http://localhost:3845/assets/81a965e03b80851249d8ffc87cf1a66dbd1f6c5e.svg";
const img18 = "http://localhost:3845/assets/38b6250c51a978de24177086fbc6cd0df7dc3578.svg";
const img19 = "http://localhost:3845/assets/18358f1e172c9851f700d4cf45843e68274586c2.svg";
const img20 = "http://localhost:3845/assets/ea8f816b1f832e9833fcd3d8dac963aae4dbd04e.svg";
const img21 = "http://localhost:3845/assets/cb2caea059e7e057d9f13c6da37c401b62e02e90.svg";
const img22 = "http://localhost:3845/assets/324c00224af8df09bda9a69adb0ebcc4f6a95ef1.svg";
const img23 = "http://localhost:3845/assets/c7fddb17def51ae1a87f1eb750ab641d3b90a1c5.svg";
const img24 = "http://localhost:3845/assets/42ed628d56fa880507b94f2ed2924f99ae06125b.svg";
const img25 = "http://localhost:3845/assets/b8ecea27e1ac92eed20a69069d8f3da95a15241f.svg";
const img26 = "http://localhost:3845/assets/b3f96a9e43af38c5894b948c6dc7922fae583a24.svg";
const img27 = "http://localhost:3845/assets/68d9df6d1e044397ccebe26ab56626480db3a9d1.svg";
const img28 = "http://localhost:3845/assets/eeea0ac6bb8cbd19b1ec94b0a406ebafdb4394f1.svg";
const img29 = "http://localhost:3845/assets/072a335ba07122ae8bbe3dfffe3174760631fb4e.svg";
const img30 = "http://localhost:3845/assets/74dcfb3d1923fbdd22248b81c62be30f49a097fb.svg";
const img31 = "http://localhost:3845/assets/b07bc03e04ccbcf7aa9fef3e93fd3f8d08cba60d.svg";

export interface CardsProps {
  // Match information
  homeTeam?: string;
  awayTeam?: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  league?: string;
  matchTime?: string;

  // Bet information
  betTitle?: string;
  originalOdds?: string;
  newOdds?: string;
  betType?: string;
  betCategory?: string;

  // Player information
  playerName?: string;
  playerTeam?: string;
  playerAvatar?: string;

  // Odds
  oddValue?: string;

  // Actions
  onOddClick?: () => void;
  onRedeemClick?: () => void;

  // Styling
  className?: string;
}

export default function Cards({
  homeTeam = "Man. City",
  awayTeam = "Barcelona",
  homeTeamLogo = imgImage,
  awayTeamLogo = imgImage1,
  league = "Champions League",
  matchTime = "Hoje, 14:00",
  betTitle = "Para chutar uma bola.",
  originalOdds = "4.5",
  newOdds = "Mais de 0.5",
  betType = "Finalizações ao gol",
  playerName = "E. Haaland",
  playerTeam = "Man. City",
  oddValue = "1.65x",
  onOddClick,
  onRedeemClick,
  className
}: CardsProps) {
  return (
    <div
      className={cn(
        "bg-white box-border content-stretch flex flex-col gap-[20px] items-center justify-center p-[20px] relative rounded-[8px] size-full",
        className
      )}
      data-name="cards"
      data-node-id="16997:28266"
    >
      {/* Header */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header" data-node-id="16997:28267">
        <div className="content-stretch flex gap-[8px] items-center justify-start relative shrink-0 w-[163px]" data-name="Partida" data-node-id="16997:28268">
          <div className="content-stretch flex items-start justify-start relative shrink-0" data-name="escudos" data-node-id="16997:28269">
            <div className="bg-center bg-cover bg-no-repeat shrink-0 size-[24px]" data-name="image" data-node-id="16997:28270" style={{ backgroundImage: `url('${homeTeamLogo}')` }} />
            <div className="bg-center bg-cover bg-no-repeat h-[24px] shrink-0 w-[25.091px]" data-name="image" data-node-id="16997:28271" style={{ backgroundImage: `url('${awayTeamLogo}')` }} />
          </div>
          <div className="basis-0 flex flex-col font-['DM_Sans:Bold',_sans-serif] font-['DM_Sans:Regular',_sans-serif] grow justify-center leading-none min-h-px min-w-px not-italic relative shrink-0 text-[#646464] text-[0px] text-[12px]" data-node-id="16997:28272">
            <p className="mb-0">
              <span className>{`${homeTeam} `}</span>
              <span className>vs</span>
            </p>
            <p className>{awayTeam}</p>
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

      {/* Title Section */}
      <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-name="titulo" data-node-id="16997:28276">
        <div className="font-['DM_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-black w-full" data-node-id="16997:28277">
          <p className="leading-[1.1]">{betTitle}</p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center justify-start relative shrink-0 w-full" data-name="valor-atributo" data-node-id="16997:28278">
          <div className="content-stretch flex gap-[4px] items-center justify-start relative shrink-0" data-name="valores" data-node-id="16997:28279">
            <div className="font-['DM_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#646464] text-[12px] text-nowrap" data-node-id="16997:28280">
              <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none line-through whitespace-pre">{originalOdds}</p>
            </div>
            <div className="relative shrink-0 size-[20px]" data-name="Icon" data-node-id="16997:28281">
              <img alt="" className="block max-w-none size-full" src={imgIcon} />
            </div>
            <div className="font-['DM_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-black text-nowrap" data-node-id="16997:28282">
              <p className="leading-none whitespace-pre">{newOdds}</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-end relative shrink-0" data-name="player-props" data-node-id="16997:28283">
            <div className="flex flex-col font-['DM_Sans:Regular',_sans-serif] justify-center leading-[0] not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-black text-nowrap text-right" data-node-id="16997:28284">
              <p className="leading-none overflow-ellipsis overflow-hidden whitespace-pre">{betType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Player and Odds Section */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Oferta" data-node-id="16997:28285">
        <div className="content-stretch flex gap-[8px] items-center justify-start relative shrink-0 w-[193px]" data-name="Jogador" data-node-id="16997:28286">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="jogador" data-node-id="16997:28287">
            <div className="[grid-area:1_/_1] ml-0 mt-0 relative rounded-[125px] size-[40px]" data-name="icon" data-node-id="16997:28288">
              <div aria-hidden="true" className="absolute border-[2.5px] border-solid border-white inset-[-2.5px] pointer-events-none rounded-[127.5px]" />
              <div className="absolute contents left-0 top-0" data-name="avatar" data-node-id="16997:28289">
                <div className="absolute left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[40px_40px] size-[40px] top-0" data-name="circle" data-node-id="16997:28291" style={{ maskImage: `url('${imgCircle}')` }}>
                  <img alt="" className="block max-w-none size-full" src={imgCircle1} />
                </div>
                <div className="absolute contents left-[5px] top-[2px]" data-name="avatar" data-node-id="16997:28292">
                  <div className="absolute h-[48px] left-[5px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-5px_-2px] mask-size-[40px_40px] overflow-clip top-[2px] w-[30px]" data-name="00-Tshirt-Man/Man" data-node-id="16997:28293" style={{ maskImage: `url('${imgCircle}')` }}>
                    <div className="absolute inset-[61.44%_0.23%_13.05%_0.47%]" data-name="arms" data-node-id="I16997:28293;2708:4553">
                      <img alt="" className="block max-w-none size-full" src={img} />
                    </div>
                    <div className="absolute inset-[36.96%_32.02%_50.66%_32.48%]" data-name="tshirt" data-node-id="I16997:28293;2719:7787">
                      <img alt="" className="block max-w-none size-full" src={img1} />
                    </div>
                    <div className="absolute bottom-[-7.25%] left-0 right-0 top-[36.96%]" data-name="04-England" data-node-id="I16997:28293;2708:4952">
                      <div className="absolute inset-[1.58%_32.04%_82.24%_32.21%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25148">
                        <img alt="" className="block max-w-none size-full" src={img2} />
                      </div>
                      <div className="absolute inset-[1.58%_32.04%_82.24%_32.21%]" data-name="gola" data-node-id="I16997:28293;2708:4952;1307:25149">
                        <img alt="" className="block max-w-none size-full" src={img3} />
                      </div>
                      <div className="absolute inset-[0.04%_32.83%_98.31%_32.34%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25150">
                        <img alt="" className="block max-w-none size-full" src={img4} />
                      </div>
                      <div className="absolute bottom-[0.04%] left-0 right-[0.04%] top-[0.08%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25151">
                        <img alt="" className="block max-w-none size-full" src={img5} />
                      </div>
                      <div className="absolute bottom-0 left-[50.17%] right-[0.06%] top-[0.15%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25152">
                        <img alt="" className="block max-w-none size-full" src={img6} />
                      </div>
                      <div className="absolute bottom-[81.84%] left-[31.34%] right-[31.39%] top-0" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25153">
                        <img alt="" className="block max-w-none size-full" src={img7} />
                      </div>
                      <div className="absolute inset-[27.81%_79.77%_55.89%_15.26%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25154">
                        <div className="absolute bottom-0 left-[-0.02%] right-0 top-0">
                          <img alt="" className="block max-w-none size-full" src={img8} />
                        </div>
                      </div>
                      <div className="absolute bottom-[63.56%] left-0 right-[84.79%] top-[31.66%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25156">
                        <img alt="" className="block max-w-none size-full" src={img9} />
                      </div>
                      <div className="absolute inset-[27.81%_15.21%_55.89%_79.73%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25157">
                        <div className="absolute bottom-0 left-0 right-[-0.02%] top-0">
                          <img alt="" className="block max-w-none size-full" src={img10} />
                        </div>
                      </div>
                      <div className="absolute bottom-[63.6%] left-[84.79%] right-0 top-[31.63%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25159">
                        <img alt="" className="block max-w-none size-full" src={img11} />
                      </div>
                      <div className="absolute bottom-[65.56%] left-0 right-[84.57%] top-[33.36%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25160">
                        <img alt="" className="block max-w-none size-full" src={img12} />
                      </div>
                      <div className="absolute inset-[33.36%_0.04%_65.56%_84.79%]" data-name="tshirt" data-node-id="I16997:28293;2708:4952;1307:25161">
                        <img alt="" className="block max-w-none size-full" src={img13} />
                      </div>
                    </div>
                    <div className="absolute bottom-[55.75%] contents left-[27.39%] right-[27.45%] top-0" data-name="face" data-node-id="I16997:28293;2708:4543">
                      <div className="absolute contents inset-[28.04%_35.72%_55.75%_35.67%]" data-name="face" data-node-id="I16997:28293;2708:4544">
                        <div className="absolute inset-[28.04%_35.72%_55.75%_35.67%]" data-name="face" data-node-id="I16997:28293;2708:4546">
                          <img alt="" className="block max-w-none size-full" src={img14} />
                        </div>
                      </div>
                      <div className="absolute inset-[16.67%_68.6%_74.28%_27.39%]" data-name="face" data-node-id="I16997:28293;2708:4549">
                        <img alt="" className="block max-w-none size-full" src={img15} />
                      </div>
                      <div className="absolute inset-[16.67%_27.45%_74.28%_68.55%]" data-name="face" data-node-id="I16997:28293;2708:4550">
                        <img alt="" className="block max-w-none size-full" src={img16} />
                      </div>
                      <div className="absolute bottom-[64.28%] left-[31.36%] right-[31.43%] top-0" data-name="face" data-node-id="I16997:28293;2708:4551">
                        <img alt="" className="block max-w-none size-full" src={img17} />
                      </div>
                      <div className="absolute bottom-[64.28%] left-[49.87%] right-[31.39%] top-0" data-name="face" data-node-id="I16997:28293;2708:4552">
                        <img alt="" className="block max-w-none size-full" src={img18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[1.806px] items-center justify-center ml-[27px] mt-[20px] p-[1.806px] relative rounded-[47.902px] size-[20px]" data-name="esporte" data-node-id="16997:28294">
              <div className="relative shrink-0 size-[15px]" data-name="02-Sports" data-node-id="16997:28295">
                <div className="absolute inset-0" data-name="Group" data-node-id="I16997:28295;5769:17311">
                  <img alt="" className="block max-w-none size-full" src={img19} />
                </div>
                <div className="absolute contents inset-0" data-name="Group" data-node-id="I16997:28295;5769:17313">
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17314">
                    <img alt="" className="block max-w-none size-full" src={img20} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17318">
                    <img alt="" className="block max-w-none size-full" src={img21} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17322">
                    <img alt="" className="block max-w-none size-full" src={img22} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17326">
                    <img alt="" className="block max-w-none size-full" src={img23} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17330">
                    <img alt="" className="block max-w-none size-full" src={img24} />
                  </div>
                  <div className="absolute contents inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17334" />
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17337">
                    <img alt="" className="block max-w-none size-full" src={img25} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17341">
                    <img alt="" className="block max-w-none size-full" src={img26} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17345">
                    <img alt="" className="block max-w-none size-full" src={img27} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17349">
                    <img alt="" className="block max-w-none size-full" src={img28} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17353">
                    <img alt="" className="block max-w-none size-full" src={img29} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17357">
                    <img alt="" className="block max-w-none size-full" src={img30} />
                  </div>
                  <div className="absolute inset-0" data-name="Clip path group" data-node-id="I16997:28295;5769:17361">
                    <img alt="" className="block max-w-none size-full" src={img31} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col font-['DM_Sans:Regular',_sans-serif] gap-[4px] items-start justify-start leading-[0] not-italic relative shrink-0 text-black text-nowrap w-[133px]" data-name="jogador" data-node-id="16997:28296">
            <div className="relative shrink-0 text-[14px]" data-node-id="16997:28297">
              <p className="leading-[1.1] text-nowrap whitespace-pre">{playerName}</p>
            </div>
            <div className="flex flex-col justify-center relative shrink-0 text-[12px] text-right" data-node-id="16997:28298">
              <p className="leading-none text-nowrap whitespace-pre">{playerTeam}</p>
            </div>
          </div>
        </div>
        <div
          className="bg-[#24719d] box-border content-stretch flex flex-col items-center justify-start leading-[0] not-italic overflow-clip px-[12px] py-[8px] relative rounded-[8px] shrink-0 text-center text-white cursor-pointer hover:bg-[#1d5a7a] transition-colors"
          data-name="Odd"
          data-node-id="16997:28299"
          onClick={onOddClick}
        >
          <div className="font-['DM_Sans:Regular',_sans-serif] relative shrink-0 text-[10px] text-nowrap" data-node-id="16997:28300">
            <p className="leading-none whitespace-pre">Odd</p>
          </div>
          <div className="font-['DM_Sans:Bold',_sans-serif] relative shrink-0 text-[12px] w-[29px]" data-node-id="16997:28301">
            <p className="leading-[1.4]">{oddValue}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div
        className="bg-[#32a866] box-border content-stretch flex items-center justify-center px-[16px] py-[14px] relative rounded-[1000px] shrink-0 w-full cursor-pointer hover:bg-[#2a8e57] transition-colors"
        data-name="Button"
        data-node-id="16997:28302"
        onClick={onRedeemClick}
      >
        <div aria-hidden="true" className="absolute border border-[#32a866] border-solid inset-0 pointer-events-none rounded-[1000px]" />
        <div className="font-['DM_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white" data-node-id="I16997:28302;2592:3153">
          <p className="leading-none whitespace-pre">Resgatar recompensa</p>
        </div>
      </div>
    </div>
  );
}