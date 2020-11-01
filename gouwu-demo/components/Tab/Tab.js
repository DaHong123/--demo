// components/Tab/Tab.js
Component({
  properties: {
    tabs: Array,
  },
  methods: {
    tabchange(e) {
      // console.log("123")
      const { id } = e.currentTarget.dataset
      console.log(id)
      this.triggerEvent("change", id)
    },
  },
})
