<script lang="ts">
    import { bloc, counterState } from '$lib/states/bloc';
    import { DecrementEvent, IncrementEvent } from '$lib/states/event';
    import { CounterStatus } from '$lib/states/state';
</script>

<div>
    {#if $counterState.status === CounterStatus.Increment}
        increment
    {:else if $counterState.status === CounterStatus.Decrement}
        decrement
    {:else}
        initial
    {/if}
    {$counterState.value}
</div>

<button on:click={() => (bloc.counterEventSink = new IncrementEvent())}>increment</button>
<button on:click={() => (bloc.counterEventSink = new DecrementEvent())}>decrement</button>
