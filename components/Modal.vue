<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Can't load header please try again. </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> Can't load body please try again. </slot>
          </div>

          <div class="modal-footer mb-3 text-right">
            <slot name="footer">
              <button
                class="btn--green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="$emit('close')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style></style>
