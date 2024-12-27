import { UserIcon, MessageCircle, Dot, Minus, Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';
import multiavatar from '@multiavatar/multiavatar';
import { faker } from '@faker-js/faker';

interface Message {
  text: string;
}

const MessageCard = ({ text }: Message) => {
  const [randomDay, setRandomDay] = useState(5);
  const [randomLikes, setrandomLikes] = useState(198);
  const [randomAvatar, setRandomAvatar] = useState<string>('');
  const [randomUserName, setRandomUserName] = useState<string>('user_123');
  useEffect(() => {
    const randomUser = faker.internet.username();
    const avatarSvg = multiavatar(randomUser);

    setRandomDay(Math.floor(Math.random() * 28) + 2);
    setRandomUserName(randomUser);
    setRandomAvatar(avatarSvg);
    setrandomLikes(Math.floor(Math.random() * (10000 - 50 + 1)) + 50);
  }, []);

  return (
    <div className="flex flex-col items-start space-x-4 relative dark:bg-black max-w-[650px]">
      {/* Аватар */}
      <div className="flex gap-4 flex-shrink-0">
        {text ? (
          <div
            dangerouslySetInnerHTML={{ __html: randomAvatar }}
            style={{ width: '40px', height: '40px', borderRadius: '100%' }}></div>
        ) : (
          // <img
          //   src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fmazda-brochures.com%2Fmain%2Fmazdamx5%2F2024%2F1%2Fen-gb%2Fcolours-rf.html&psig=AOvVaw0IQvycw5G67yceY8ceWHoM&ust=1735244223919000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjds8_ew4oDFQAAAAAdAAAAABAE"
          //   alt={`${randomUserName}'s avatar`}
          //   className="w-10 h-10 rounded-full"
          // />
          <div className=" w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
            <UserIcon className="w-5 h-5 text-gray-500" />
          </div>
        )}
        <div className="h-[12px] w-5 dark:bg-black bg-gray-100 absolute top-10 left-[12px]"></div>
        <div className="flex items-center justify-between ">
          <h4 className="font-medium text-gray-900 dark:text-gray-300">{randomUserName}</h4>
          <Dot color="gray" height={10} width={10} className="mt-[5px] mx-[2px]" />
          <span className="text-gray-500 text-sm mt-[2px] dark:text-gray-300">
            {randomDay} days ago
          </span>
          <Dot color="gray" height={10} width={10} className="mt-[5px] mx-[2px]" />
        </div>
      </div>

      {/* Контент сообщения */}
      <div className="flex-1">
        <div className="flex relative flex-col dark:border-gray-500 border-l-[2px] mt-1 ml-1 pl-[35px]">
          <p className="text-gray-800 font-normal dark:text-white">{text}</p>
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex gap-3 items-center">
              <span className="flex mx-xs text-gray-500 text-16 dark:text-gray-300">
                <svg
                  fill="currentColor"
                  height="18"
                  icon-name="upvote-outline"
                  viewBox="0 0 20 20"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
                </svg>
              </span>
              <span className="font-semibold text-[15px] text-gray-700 dark:text-gray-300">
                {randomLikes}
              </span>
              <span className="flex mx-xs text-gray-500 text-16 dark:text-gray-300">
                <svg
                  className="rotate-180"
                  fill="currentColor"
                  height="18"
                  icon-name="upvote-outline"
                  viewBox="0 0 20 20"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 19c-.072 0-.145 0-.218-.006A4.1 4.1 0 0 1 6 14.816V11H2.862a1.751 1.751 0 0 1-1.234-2.993L9.41.28a.836.836 0 0 1 1.18 0l7.782 7.727A1.751 1.751 0 0 1 17.139 11H14v3.882a4.134 4.134 0 0 1-.854 2.592A3.99 3.99 0 0 1 10 19Zm0-17.193L2.685 9.071a.251.251 0 0 0 .177.429H7.5v5.316A2.63 2.63 0 0 0 9.864 17.5a2.441 2.441 0 0 0 1.856-.682A2.478 2.478 0 0 0 12.5 15V9.5h4.639a.25.25 0 0 0 .176-.429L10 1.807Z"></path>
                </svg>
              </span>
            </div>
            <div className="flex gap-2 items-center font-medium text-[13.5px] dark:text-gray-300">
              <MessageCircle className="w-[18px] h-[18px] " strokeWidth={1.45} />
              <span>Reply</span>
            </div>
            <div className="flex gap-2 items-center font-medium text-[13.5px] dark:text-gray-300">
              {/* <CornerUpRight className="w-[18px] h-[18px] mt-[2px]" />
               */}
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                height="16"
                icon-name="share-new-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.239 18.723A1.235 1.235 0 0 1 1 17.488C1 11.5 4.821 6.91 10 6.505V3.616a1.646 1.646 0 0 1 2.812-1.16l6.9 6.952a.841.841 0 0 1 0 1.186l-6.9 6.852A1.645 1.645 0 0 1 10 16.284v-2.76c-2.573.243-3.961 1.738-5.547 3.445-.437.47-.881.949-1.356 1.407-.23.223-.538.348-.858.347ZM10.75 7.976c-4.509 0-7.954 3.762-8.228 8.855.285-.292.559-.59.832-.883C5.16 14 7.028 11.99 10.75 11.99h.75v4.294a.132.132 0 0 0 .09.134.136.136 0 0 0 .158-.032L18.186 10l-6.438-6.486a.135.135 0 0 0-.158-.032.134.134 0 0 0-.09.134v4.36h-.75Z"></path>
              </svg>

              <span>Share</span>
            </div>
            <div className="items-center font-medium text-[13.5px] dark:text-white">
              <Ellipsis width={17} />
            </div>
          </div>
          <div className="flex items-center justify-center absolute z-10 bottom-[4px] left-[-9.4px] dark:border-gray-500 dark:bg-black bg-gray-100 border-[1.5px] border-gray-500 rounded-full w-[17px] h-[17px]">
            <Minus width={9} className="dark:text-white" />
          </div>
        </div>
      </div>
      <div className="h-[6.2px] w-5 bg-gray-100 dark:bg-black z-5 absolute dark:bottom-[0px] bottom-[0px] left-[-10px]"></div>
    </div>
  );
};

export default MessageCard;
