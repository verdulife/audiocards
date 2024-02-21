<script>
  import { generateCard } from "@/lib/pdf";
  import { previewData, pdfOptions, cardData } from "@/lib/stores";
  import backImg from "@/assets/back.jpg?base64";
  import frontImg from "@/assets/front.jpg?base64";

  let checkRequired = false;

  async function updatePdf() {
    $previewData = await generateCard($cardData, frontImg, backImg);
    checkRequired = true;
  }

  function downloadPdf() {
    updatePdf();
    const link = document.createElement("a");
    link.href = $previewData;
    link.download = "tarjetas-visita.pdf";
    link.click();
  }
</script>

<section class="w-full max-w-xs border p-6 bg-slate-100">
  <h1 class="text-4xl font-bold mb-8">Creador tarjetas visita</h1>

  <form
    on:input={() => (checkRequired = false)}
    on:submit|preventDefault={updatePdf}
    class="flex flex-col w-full gap-1"
  >
    <label
      class="flex flex-col gap-4 bg-white rounded-md border border-gray-200 p-2"
    >
      <p class="text-xs font-bold text-gray-500 px-1">NOMBRE</p>
      <input type="text" bind:value={$cardData.name} required class="text-xl" />
    </label>

    <label
      class="flex flex-col gap-4 bg-white rounded-md border border-gray-200 p-2"
    >
      <p class="text-xs font-bold text-gray-500 px-1">PHONE</p>
      <input type="tel" bind:value={$cardData.phone} required class="text-xl" />
    </label>

    <label
      class="flex flex-col gap-4 bg-white rounded-md border border-gray-200 p-2"
    >
      <p class="text-xs font-bold text-gray-500 px-1">CIUDAD/ZONA</p>
      <input type="text" bind:value={$cardData.city} required class="text-xl" />
    </label>

    <label
      class="flex flex-col gap-4 bg-white rounded-md border border-gray-200 p-2"
    >
      <p class="text-xs font-bold text-gray-500 px-1">DIRECCIÓN</p>
      <textarea bind:value={$cardData.address} required class="text-xl" />
    </label>

    <button type="submit" class="bg-black text-white px-4 py-2 rounded-md"
      >ACTUALIZAR</button
    >

    {#if checkRequired}
      <button
        type="button"
        on:click={downloadPdf}
        class="bg-blue-500 text-white px-4 py-2 rounded-md">DESCARGAR</button
      >
    {/if}
  </form>
</section>
