<template>
  <div class="min-h-screen">
    <main class="max-w-5xl px-5 mx-auto pt-7 lg:px-0">
      <!-- Page title -->
      <h1 class="text-2xl font-medium">
        Books
      </h1>
      <p class="mt-2 text-sm text-gray-500">
        Manage your books here
      </p>

      <div class="flex flex-col items-center justify-between mt-5 space-y-3 md:space-y-0 md:flex-row">
        <div class="relative w-full md:mr-10 grow">
          <span class="absolute -translate-y-1/2 top-1/2 left-3">
            <Icon class="text-gray-400" name="ep:search" size="24"/>
          </span>
          <input
              id="search"
              v-model="search"
              class="pl-11 input"
              name="search"
              placeholder="Search books..."
              type="search"
          >
        </div>
        <button class="w-full py-3.5 md:py-2.5 md:w-auto btn shrink-0" @click="bookModal.openModal()">
          Add Book
        </button>
      </div>

      <div class="relative mt-5 border border-gray-100 rounded-lg">
        <ClientOnly>
          <EasyDataTable
              :headers="headers"
              :items="bookStore.books"
              :search-value="search"
              empty-message="No Book Found"
              table-class-name="eztble"
              theme-color="#f97316"
          >
            <!-- Show title with custom styles -->
            <template #item-title="{ title }">
              <span class="font-semibold">{{ title }}</span>
            </template>
            <template #item-published="{ published }">
              <span>{{ dayjs(published).format("MMM DD, YYYY") }}</span>
            </template>
            <!-- Action items for table -->
            <template #item-actions="book">
              <div class="flex space-x-4 text-gray-500">
                <button @click="bookModal.openModal(book)">
                  <Icon name="fluent:pen-24-regular" size="18"/>
                </button>
                <button @click="removeBook(book)">
                  <Icon name="fluent:delete-24-regular" size="18"/>
                </button>
              </div>
            </template>
          </EasyDataTable>
        </ClientOnly>
      </div>
    </main>
    <!-- Book modal comp -->
    <BookModal ref="bookModal"/>
  </div>
</template>

<script lang="ts" setup>
import {Header} from 'vue3-easy-data-table';
import dayjs from 'dayjs';
// Book store from pinia
const bookStore = useBookStore();

await useAsyncData(() => bookStore.getAll(), {
  initialCache: false
});

const bookModal = ref();
const search = ref('');

const headers: Header[] = [
  {text: 'Title', value: 'title', sortable: true, width: 200},
  {text: 'Published', value: 'published', width: 150},
  {text: 'ISBN', value: 'isbn', sortable: true},
  {text: 'Page Count', value: 'pageCount', sortable: true, width: 200},
  {text: 'Actions', value: 'actions', width: 100}
];

const removeBook = async (book) => {
  await bookStore.remove(book._id);
};
</script>
