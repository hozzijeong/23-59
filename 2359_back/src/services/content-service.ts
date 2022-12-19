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
