const serviceApi = {
  // 查询办事进度
  searchTAffairsByCheckPassword: {
    url: 'tAffairsAppending/searchTAffairsByCheckPassword',
    method: 'get'
  },
  // 个人办事 法人办事
  queryTheme: {
    url: 'portal/queryTheme',
    method: 'post'
  },
  //部门
  queryDepartment: {
    url: 'portal/queryDepartment',
    methoe: 'post'
  },
  //行政审批
  queryCategory: {
    url: 'queryCategory',
    method: 'post'
  },
  // 公共服务
  publicService: {
    url: 'portal/queryTheme',
    method: 'post'
  },
  // 事项列表
  personalAffair: {
    url: 'portal/personalAffair',
    method: 'post'
  },
  // 办事指南
  queryWorkGuide: {
    url: 'portal/queryWorkGuide',
    method: 'post'
  },
  // 建议公开
  getProposalListForOpen: {
    url: 'proposal/getProposalListForOpen',
    method: 'get'
  },
  // 投诉公开
  getComplaintListForOpen: {
    url: 'complaint/getComplaintListForOpen',
    method: 'get'
  },
  // 建议公开详情页
  getProposalDetail: {
    url: 'proposal/getProposalDetail',
    method: 'get'
  },
  // 投诉公开详情页
  getComplaintDetail: {
    url: 'complaint/getComplaintDetail',
    method: 'get'
  },
  // 上传
  fileUpload: {
    url: 'tAffairsAppending/fileUpload',
    method: 'post'
  },
  // 建议保存
  saveProposal: {
    url: 'proposal/saveProposal',
    method: 'post',
    contentType: 'application/json;charset=UTF-8'    
  },
  // 建议类型 
  getProposalType: {
    url: 'proposal/getProposalType',
    method: 'get'
  },
  // 我要评价
  saveWholeScore: {
    url: 'score/saveWholeScore',
    method: 'post',
    contentType: 'application/json;charset=UTF-8'    
  },
  // 我要投诉
  saveWholeComplaint: {
    url: 'complaint/saveWholeComplaint',
    method: 'post',
    contentType: 'application/json;charset=UTF-8'    
  },
  // 投诉地区获取
  getDistrictList: {
    url: 'common/getDistrictList',
    method: 'get'
  },
  // 投诉部门获取
  getDepartmentList: {
    url: 'common/getDepartmentList',
    method: 'get'
  },
  // 我的空间
  getPersonalSpace: {
    url: 'tAffairsAppending/getPersonalSpace',
    method: 'post'
  },
  // 删除已办结的
  delAffairsAppending: {
    url: 'tAffairsAppending/delAffairsAppending',
    method: 'post'
  },
  // 我的办件  办理状态和主管部门
  getStatusAndDept: {
    url: 'tAffairsAppending/getStatusAndDept',
    method: 'post'
  },
  // 我的办件 办件列表
  getAffairsAppendingList: {
    url: 'tAffairsAppending/getAffairsAppendingList',
    method: 'post',
    contentType: 'application/json;text/plan;charset=UTF-8'
  },
  // 取消预约
  cancelAffairOrder: {
    url: 'affairOrderController/cancelAffairOrder',
    method: 'post'
  },
  // 我的办件详情
  getAffairAppendingInfos: {
    url: 'tAffairsAppending/getAffairAppendingInfos',
    method: 'post'
  },
  // 我的建议
  getProposalListByCusToken: {
    url: 'proposal/getProposalListByCusToken',
    method: 'get'
  },
  // 我的投诉
  getComplaintListByCusToken: {
    url: 'complaint/getComplaintListByCusToken',
    method: 'get'
  },
  // 我的政民互动详情页
  getProposalDetail: { //建议
    url: 'proposal/getProposalDetail',
    method: 'get'
  },
  getMessageDetail: { //咨询
    url: 'message/getMessageDetail',
    method: 'get'
  },
  getComplaintDetail: { //投诉
    url: 'complaint/getComplaintDetail',
    method: 'get'
  },
  // 删除投诉
  delComplaint: {
    url: 'complaint/delComplaint',
    method: 'post'
  },
  // 删除建议
  delProposal: {
    url: 'proposal/delProposal',
    method: 'post'
  },
  // 我的咨询
  getMessageListByCusToken: {
    url: 'message/getMessageListByCusToken',
    method: 'get'
  },
  // 删除咨询
  delMessage: {
    url: 'message/delMessage',
    method: 'post'
  },
  // 咨询详情
  getMessageDetail: {
    url:'message/getMessageDetail',
    method: 'get'
  },
  // 我的评价
  getScoreListByCusToken: {
    url: 'score/getScoreListByCusToken',
    method: 'get'
  },
  // 删除我的评价
  delScore: {
    url: 'score/delScore',
    method: 'post'
  },
  // 评价详情
  getScoreDetail: {
    url: 'score/getScoreDetail',
    method: 'get'
  },
  // 消息列表
  getMessageNoticeList: {
    url: 'messageNotice/getMessageNoticeList',
    method: 'post'
  },
  // 删除消息
  updateMessageListInfo: {
    url: 'messageNotice/updateMessageListInfo',
    method: 'post',
    contentType: 'application/json;text/plan;charset=UTF-8'
  },
  // 查看消息列表详情
  getMessageInfo: {
    url: 'messageNotice/getMessageInfo',
    method: 'post'
  },
  // 事项预约时间查询
  getAffairOrderTime: {
    url:'affairOrderController/getAffairOrderTime',
    method: 'post'
  },
  // 预约保存
  saveAffairOrder: {
    url: 'affairOrderController/saveAffairOrder',
    method: 'post'
  }
}

export default serviceApi
