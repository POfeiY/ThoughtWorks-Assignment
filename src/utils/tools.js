
import { Notification } from 'element-ui'
export function resourceJudge(tag, tagsArr) {
  const messageWrap = {
    empty: 'New resource tag cannot be an empty string',
    repeat: 'The new label already exists. Please replace the label name',
    success: ''
  }
  const norepeattagsArr = []
  const tagArr = tag.split(",")
  if(tagArr.length === 0) {
    Notification({
      title: 'Warning',
      message: messageWrap.empty,
      type: 'warning'
    })
  } else {
    for (let item of tagArr) {
      !tagsArr.includes(item)
      ? norepeattagsArr.push(item)
      : Notification({ title: 'Warning', message: `The new label ${item} already exists. Please replace the label name`, type: 'warning'})
    }
  }
  return { norepeattagsArr }
}