<script lang="ts">
    import { bloc, counterState } from '$lib/states/bloc';
    import { DecrementEvent, IncrementEvent } from '$lib/states/event';
    import CounterState from '$lib/states/state';
</script>

<div>
    {#if $counterState.status === 'Increment'}
        increment
    {:else if $counterState.status === 'Decrement'}
        decrement
    {:else}
        initial
    {/if}
    <div>
        {$counterState.value}
        {$counterState.equals(new CounterState('Initial', 0))}
    </div>
</div>

<button on:click={() => (bloc.setCounterEvent = new IncrementEvent())}>increment</button>
<button on:click={() => (bloc.setCounterEvent = new DecrementEvent())}>decrement</button>
