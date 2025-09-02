import { colors } from '../../../../design-tokens/colors';

const img = "http://localhost:3845/assets/6504ba5ad6c6f943ec03ccff56a845c7c808a876.svg";
const img1 = "http://localhost:3845/assets/d8c4b012f051e9e86db4431c8d919d7326cccb42.svg";
const img2 = "http://localhost:3845/assets/feab1aac9494d87cce5a40df643c4641aa0d0376.svg";
const img3 = "http://localhost:3845/assets/1ea16d68387419d5acc2895f10b40e9a3fe52e8d.svg";
const img4 = "http://localhost:3845/assets/f317ec85ce8e8b5dbf5b2dffa66557460aa7a1ac.svg";
const img5 = "http://localhost:3845/assets/4ed89073e77483020d645714291844503539201b.svg";
const img6 = "http://localhost:3845/assets/324919104654937c9c89327dc1b7d656405567da.svg";
const img7 = "http://localhost:3845/assets/605ef6ed5f3f2ed45301c9b984c9a6f4cda216be.svg";
const img8 = "http://localhost:3845/assets/30e89936f0357f017a69efb936122b328dd8fdf5.svg";
const img9 = "http://localhost:3845/assets/aa6aabee6ff9c10db75a1e096403e2036abf8f4a.svg";
const img10 = "http://localhost:3845/assets/d2157f6b37dc06c98e706dd48bcedfa54a61c2fd.svg";
const img11 = "http://localhost:3845/assets/f3e46e59adf3e45fb383249c34fd76505243d7ff.svg";
const img12 = "http://localhost:3845/assets/de04faca8a2d4de3cd2b363cb7218bdec2c09251.svg";
const imgIcon = "http://localhost:3845/assets/5c67c805bd04b804cd9e6c116581a345a45a2798.svg";

interface HeaderInfoProps {
  level?: string;
  xp?: string;
  clubName?: string;
  actionText?: string;
  onClick?: () => void;
}

export default function HeaderInfo({
  level = "Iniciante",
  xp = "0 XP",
  clubName = "Clube da Realeza",
  actionText = "Ver detalhes",
  onClick
}: HeaderInfoProps) {
  return (
    <div 
      className="bg-[#32a866] box-border content-stretch flex gap-5 items-center justify-start px-5 py-3 relative rounded-tl-[8px] rounded-tr-[8px] size-full cursor-pointer" 
      onClick={onClick}
      data-name="nivel" 
      data-node-id="2162:1516"
    >
      <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="base" data-node-id="2162:1517">
        <div className="overflow-clip relative shrink-0 size-10" data-name="25-Loyalty" data-node-id="2163:3360">
          <div className="absolute h-10 left-1/2 overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%] w-[36.666px]" data-name="iniciante" id="node-I2163_3360-9670_1423">
            <div className="absolute bottom-[-0.01%] contents left-0 right-0 top-0" data-name="Iniciante cópia cópia" id="node-I2163_3360-9670_1424">
              <div className="absolute bottom-[-0.01%] contents left-0 right-0 top-0" data-name="Group" id="node-I2163_3360-9670_1425">
                <div className="absolute inset-[9.38%_6.11%_-0.01%_6.06%]" data-name="Vector" id="node-I2163_3360-9670_1426">
                  <img alt="" className="block max-w-none size-full" src={img} />
                </div>
                <div className="absolute inset-[18.31%_13.29%_8.46%_13.22%]" data-name="Vector" id="node-I2163_3360-9670_1427">
                  <img alt="" className="block max-w-none size-full" src={img1} />
                </div>
                <div className="absolute contents inset-[18.31%_13.29%_8.46%_13.22%]" data-name="Clip path group" id="node-I2163_3360-9670_1428">
                  <div className="absolute bottom-0 contents left-[26.89%] right-[27.54%] top-[29.18%]" data-name="Group" id="node-I2163_3360-9670_1431">
                    <div className="absolute bottom-0 left-[26.89%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-15.035px_-13.038px] mask-size-[80.835px_87.88px] right-[27.54%] top-[29.18%]" data-name="Group" id="node-I2163_3360-9670_1432" style={{ maskImage: `url('${img2}')` }}>
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[84.66%] left-0 right-[93.95%] top-0" data-name="Vector" id="node-I2163_3360-9670_1442">
                  <img alt="" className="block max-w-none size-full" src={img4} />
                </div>
                <div className="absolute bottom-[84.66%] left-[2.95%] right-[93.95%] top-0" data-name="Vector" id="node-I2163_3360-9670_1443">
                  <img alt="" className="block max-w-none size-full" src={img5} />
                </div>
                <div className="absolute inset-[2.88%_97.77%_91.36%_0.65%]" data-name="Vector" id="node-I2163_3360-9670_1444">
                  <img alt="" className="block max-w-none size-full" src={img6} />
                </div>
                <div className="absolute bottom-[84.66%] left-[93.95%] right-0 top-0" data-name="Vector" id="node-I2163_3360-9670_1445">
                  <img alt="" className="block max-w-none size-full" src={img7} />
                </div>
                <div className="absolute bottom-[84.66%] left-[96.98%] right-0 top-0" data-name="Vector" id="node-I2163_3360-9670_1446">
                  <img alt="" className="block max-w-none size-full" src={img8} />
                </div>
                <div className="absolute inset-[2.88%_3.75%_91.36%_94.67%]" data-name="Vector" id="node-I2163_3360-9670_1447">
                  <img alt="" className="block max-w-none size-full" src={img9} />
                </div>
                <div className="absolute inset-[5.09%_6.05%_88.82%_6.05%]" data-name="Vector" id="node-I2163_3360-9670_1448">
                  <img alt="" className="block max-w-none size-full" src={img10} />
                </div>
                <div className="absolute inset-[9.38%_6.05%_88.02%_6.05%]" data-name="Vector" id="node-I2163_3360-9670_1449">
                  <img alt="" className="block max-w-none size-full" src={img11} />
                </div>
                <div className="absolute inset-[7.5%_6.05%_90.29%_6.05%]" data-name="Vector" id="node-I2163_3360-9670_1450">
                  <img alt="" className="block max-w-none size-full" src={img12} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-0 content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="txt" data-node-id="2162:1519">
          <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-start leading-[0] min-h-px min-w-px not-italic pb-1 pt-0 px-0 relative shrink-0 text-nowrap" style={{ color: colors['primary-green-darkest'] }} data-name="txt" data-node-id="2162:1520">
            <div className="flex flex-col font-['DM_Sans'] font-bold justify-center mb-[-4px] relative shrink-0 text-[14px]" data-node-id="2162:1521">
              <p className="leading-[1.4] text-nowrap whitespace-pre">{level}</p>
            </div>
            <div className="flex flex-col font-['DM_Sans'] font-normal justify-center mb-[-4px] relative shrink-0 text-[12px]" data-node-id="2162:1522">
              <p className="leading-[1.4] text-nowrap whitespace-pre">{xp}</p>
            </div>
          </div>
          <div className="content-stretch flex gap-1 items-start justify-center relative shrink-0" data-name="valor" data-node-id="2162:1523">
            <div className="content-stretch flex flex-col gap-0.5 items-end justify-center leading-[0] not-italic relative shrink-0 text-nowrap" style={{ color: colors['primary-green-darkest'] }} data-node-id="2162:1524">
              <div className="flex flex-col font-['DM_Sans'] font-normal h-4 justify-center overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] w-[95px]" data-node-id="2162:1525">
                <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] leading-none overflow-inherit">{clubName}</p>
              </div>
              <div className="flex flex-col font-['DM_Sans'] font-bold justify-center relative shrink-0 text-[10px]" data-node-id="2162:1526">
                <p className="leading-none text-nowrap whitespace-pre">{actionText}</p>
              </div>
            </div>
            <div className="relative shrink-0 size-4" data-name="Icon" data-node-id="2162:1527">
              <img alt="" className="block max-w-none size-full" src={imgIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}