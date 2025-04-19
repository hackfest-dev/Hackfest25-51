/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/test.json`.
 */
export type Test = {
  "address": "BUnZHEsqHYAnE2k4qiEA93VXcMNqPz9a2e2tYjWct6AH",
  "metadata": {
    "name": "test",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "test",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "cid",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "test",
      "discriminator": [
        21,
        124,
        154,
        78,
        247,
        222,
        89,
        189
      ]
    }
  ],
  "types": [
    {
      "name": "test",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cid",
            "type": "string"
          }
        ]
      }
    }
  ]
};
