import { ref } from 'vue';
let vModel = ref<string>('我是tsxv-model');
// v-model  v-show
let arr = [1, 2, 3, 4, 5];
const renderDom = () => {
  return (
    <div>
      <div>hellow tsx</div>
      <input type="text" v-model={vModel.value} />
      <div class="red">{vModel.value}</div>
      {arr.map((item, index) => {
        return <div key={index}>{item}</div>;
      })}
    </div>
  );
};

export default renderDom;
