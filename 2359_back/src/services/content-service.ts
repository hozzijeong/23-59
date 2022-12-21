import contentModel from '../db/models/content-model';

class ContentService {
  contentModel;

  constructor(contentModel: any) {
    this.contentModel = contentModel;
  }

  // 컨텐츠 생성
  async addContent(contentData: any) {
    const newContent = await this.contentModel.createContent(contentData);
    return newContent;
  }

  // 전체 컨텐츠 조회
  async getContents() {
    const contents = await this.contentModel.findAll();
    return contents;
  }

  // id로 컨텐츠 조회
  async getContentById(id: string) {
    const content = await this.contentModel.findById(id);
    if (!content) {
      console.log('해당 id의 컨텐츠가 없습니다.');
    }
    return content;
  }

  // 날짜로 컨텐츠 조회
  async getContentBySelectedDate(selectedDate: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    return content;
  }

  // 컨텐츠 변경
  async setContent(contentId: string, toUpdate: any) {
    const updatedContent = await this.contentModel.updateContent({
      contentId,
      update: toUpdate,
    });

    return updatedContent;
  }

  // 컨텐츠 삭제
  async deleteContent(contentId: string) {
    const { deletedContent }: any | null = await this.contentModel.deleteById(contentId);

    if (deletedContent === 0) {
      throw new Error(`${contentId} 컨텐츠 삭제에 실패했습니다.`);
    }

    return { result: 'success' };
  }

  // 해당 날짜내의 컨텐츠 조회
  async filterDate(prevDate: string, nextDate: string) {
    const contents = await this.contentModel.filterByDate(prevDate, nextDate);
    if (!contents) {
      console.log('해당 날짜내의 컨텐츠가 없습니다.');
    }
    console.log('contents: ', contents);
    return contents;
  }

  async getCalendar(selectedDate: string) {
    const content = await this.contentModel.findBySelectedDate(selectedDate);
    if (!content) {
      console.log('해당 날짜의 컨텐츠가 없습니다.');
    }
    const emotionArr = content.map((obj: any) => obj.emotion);
    let etcBool = false;
    if (content.map((obj: any) => obj.todo) === undefined) {
      etcBool = false;
    } else if (content.map((obj: any) => obj.diary) === undefined) {
      etcBool = false;
    } else if (content.map((obj: any) => obj.qna) === undefined) {
      etcBool = false;
    } else {
      etcBool = true;
    }
    const accounts = content.map((obj: any) => obj.account);
    console.log('accounts: ', accounts);

    const clsArr = [];
    const amountArr = [];
    for (let i = 0; i < accounts[0].length; i++) {
      if (accounts[0][i] === undefined) {
        continue;
      }
      clsArr.push(accounts[0][i].cls);
      amountArr.push(accounts[0][i].amount);
    }
    console.log('clsArr ', clsArr);
    console.log('amountArr ', amountArr);

    const map = new Map();
    console.log('map: ', map);

    for (let i = 0; i < clsArr.length; i++) {
      map.set(clsArr[i], (map.get(clsArr[i]) ?? 0) + amountArr[i]);
    }
    const account = Object.fromEntries(map);
    console.log('account ', account);

    const result = { emotion: emotionArr[0], etc: etcBool, account };
    console.log('result: ', result);
    return result;
  }

  // 감정 통계
  async filterEmotion(prevDate: string, nextDate: string) {
    const emotions = await this.contentModel.filterByEmotion(prevDate, nextDate);
    if (!emotions) {
      console.log('저장된 감정표시가 없습니다.');
    }
    const filtered = emotions.map((obj: any) => obj.emotion);
    console.log('filtered: ', filtered);
    //const e = filteredEmotions.map((obj: any) => obj.diary);
    // const emotionsArr = [];
    // for (let i = 0; i < filtered.length; i++) {
    //   if (filtered[i] === undefined) {
    //     continue;
    //   }
    //   emotionsArr.push(filtered[i].emotion);
    // }
    const filteredEmotions = filtered.reduce((a: any, i: number) => {
      return (a[i] = (a[i] || 0) + 1), a;
    }, {});
    //console.log('emotionsArr: ', emotionsArr);
    console.log('filteredEmotions: ', filteredEmotions);
    return filteredEmotions;
  }

  // 가계부 수입 합산
  async filterCls(prevDate: string, nextDate: string) {
    const cls = await this.contentModel.filterByCls(prevDate, nextDate);
    if (!cls) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = cls.map((obj: any) => obj.account);
    //const filtered2 = cls.filter((obj: any) => obj.amount, []);
    const amounts = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i][0] === undefined) {
        continue;
      }
      amounts.push(filtered[i][0].amount);
    }
    console.log('filtered: ', filtered, filtered.length);
    console.log('amounts: ', amounts);
    //console.log('filtered: ', filtered[0][0].amount, filtered[1][0].amount);
    const amount = amounts.reduce((sum, curr) => sum + curr);
    console.log('amount: ', amount);
    return amount;
  }

  // 가계부 지출 카테고리별 통계
  async filterCategory(prevDate: string, nextDate: string) {
    const category = await this.contentModel.filterByCategory(prevDate, nextDate);
    if (!category) {
      console.log('저장된 가계부가 없습니다.');
    }
    const filtered = category.map((obj: any) => obj.account);
    console.log('filtered: ', filtered);
    const categories = filtered.map((obj: any) => obj[0].category);
    console.log('categories: ', categories);
    const amounts = filtered.map((obj: any) => obj[0].amount);
    console.log('amounts: ', amounts);

    const map = new Map();
    console.log('map: ', map);

    for (let i = 0; i < categories.length; i++) {
      map.set(categories[i], (map.get(categories[i]) ?? 0) + amounts[i]);
    }
    const result = Object.fromEntries(map);
    console.log('result ', result);

    return result;
  }
}

const contentService = new ContentService(contentModel);

export { contentService };

// // 컨텐츠 생성
// const addContent = async (contentData: any) => {
//   const newContent = await contentModel.createContent(contentData);
//   return newContent;
// };

// // 전체 컨텐츠 조회
// const getContents = async () => {
//   const contents = await contentModel.findAll();
//   return contents;
// };

// // 날짜 클릭으로 컨텐츠 조회
// const getContent = async (selectedDate: string) => {
//   const content = await contentModel.findBySelectedDate(selectedDate);
//   if (!content) {
//     console.log('해당 날짜의 컨텐츠가 없습니다.');
//   }
//   return content;
// };

// // 컨텐츠 변경
// const setContent = async (contentId: string, toUpdate: any) => {
//   const updatedContent = await contentModel.updateContent({
//     contentId,
//     update: toUpdate,
//   });

//   return updatedContent;
// };

// // 컨텐츠 삭제
// const deleteContent = async (contentId: string) => {
//   const { deletedContent }: any | null = await contentModel.deleteById(contentId);

//   if (deletedContent === 0) {
//     throw new Error(`${contentId} 컨텐츠 삭제에 실패했습니다.`);
//   }

//   return { result: 'success' };
// };

// export default { addContent, getContents, getContent, setContent, deleteContent };
