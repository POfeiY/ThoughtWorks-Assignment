import fetch from '@/service/http'

export default {
  getResource: config => fetch('/agents', 'GET', config),
  modifyResource: (config) => fetch(`/agents/${config.data.id}`, 'PUT', config),
}
