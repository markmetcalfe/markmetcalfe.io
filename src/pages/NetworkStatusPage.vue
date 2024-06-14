<template>
  <PageCard back-button-page="/">
    <template #title>Connection Status</template>
    <div class="networkstatus">
      <LoadingSpinner v-if="isLoading" />
      <p v-else-if="isConnected" class="networkstatus-connected">
        Connected To Local Network
      </p>
      <p v-else class="networkstatus-notconnected">
        Not Connected To Local Network
      </p>
    </div>
  </PageCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import PageCard from '../components/PageCard.vue'
export default defineComponent({
  name: 'NetworkStatusPage',
  components: { LoadingSpinner, PageCard },

  data() {
    return {
      isLoading: true,
      isConnected: false,
    }
  },

  async mounted() {
    // If not connected to the local network, then the request will time out.
    // Can assume that after 2 seconds, if there is no response back,
    // then the local network isn't available.
    setTimeout(() => {
      this.isLoading = false
    }, 2000)

    try {
      const response = await fetch(
        'http://192.168.1.100/15350ad27ddde2548299e9fe8895d54d585a5e779db269d051e38739e21bd81d',
      )
      const responseText = await response.text()
      this.isConnected = response.status === 200 && responseText === 'Connected'
    } catch (error) {
      this.isConnected = false
    }
  },
})
</script>

<style lang="scss">
@import '../variables';

.networkstatus {
  min-width: 400px;
  font-size: 2rem;
  font-weight: bold;
}

.networkstatus-connected {
  color: var(--color-green);
}

.networkstatus-notconnected {
  color: var(--color-red);
}
</style>
