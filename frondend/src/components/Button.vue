<script lang="ts">
import { defineComponent, h, toRefs } from '@vue/runtime-core';

export default defineComponent({
  props: {
    as: {
      type: String,
      default: 'button'
    },
    type: { type: String, default: 'primary' },
  },
  setup(props, { slots }) {
    let className = `btn btn-${props.type} rounded-10`;
    const { as: tag } = toRefs(props);

    return () => h(<string>tag.value, { class: className }, slots);
  },
})
</script>
