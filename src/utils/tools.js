
import { Notification } from 'element-ui'
export function resourceJudge(tag, tagsArr) {
  const messageWrap = {
    empty: 'New resource tag cannot be an empty string',
    repeat: 'The new label already exists. Please replace the label name',
    success: ''
  }
  if(tag === '') {
    Notification({
      title: 'Warning',
      message: messageWrap.empty,
      type: 'warning'
    })
    return { canBeAdded: false}
  }
  if(tagsArr.includes(tag)) {
    Notification({
      title: 'Warning',
      message: messageWrap.repeat,
      type: 'warning'
    })
    return { canBeAdded: false}
  }
  return { canBeAdded: true, message: messageWrap.success }
}